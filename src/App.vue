<template>
  <div id="app">
    <div class="update_block">
      <span class="update_block-desc">Last update (every 24h): <span class="black">{{
        currentToken === tokens.XOR
          ? tokensInfo.XOR.lastUpdate
          : tokensInfo.VAL.lastUpdate
      }}</span></span>
    </div>
    <div class="logo_block">
        <img class="logo_block-img" src="@/assets/icons/sora.png" alt="SORA NET Dashboard" />
        <div class="desk_block-text">
          <span>SORA – The Decentralized Autonomous Economy</span>
          <a class="link" href="https://sora.org" alt="Sora.org">sora.org<img class="icon" src="@/assets/icons/external.svg"></a>
        </div>
    </div>
    <div class="row_block">
      <card-component
        :current-token="currentToken"
        :token="currentToken"
        :supply="tokensInfo[currentToken.toUpperCase()].totalSupply"
      />
    </div>
    <div class="table_block">
      <div class="table_title">
        <span class="table_block-title">SORA NET {{ currentToken.toUpperCase() }} Holders</span>
      </div>
      <div class="table">
        <div class="table_sticky">
          <div class="table_header table_row header">
            <span class="cell">#</span>
            <span class="cell">Account ID</span>
            <span class="cell">{{ currentToken.toUpperCase() }} Holders Amount</span>
            <span class="cell">Total Supply Part</span>
          </div>
        </div>
        <div
          v-for="(row, index) in holders"
          :key="row.accountId"
          class="table_row"
        >
          <span class="cell">{{ (currentPage * currentPageSize) + index + 1 }}</span>
          <span class="cell">{{ row.accountId }} </span>
          <span class="cell">{{ row.amount | toBNString }}</span>
          <span class="cell">{{ row.percentage }}%</span>
        </div>
        <div v-if="!holders.length" class="table_row table_empty">
          No data
        </div>
        <div class="table_row table_footer footer">
          <s-pagination
            :key="currentToken"
            :total="tokensInfo[currentToken.toUpperCase()].totalHolders"
            @size-change="onPageSizeChange"
            @current-change="(page) => nextPage(page - 1)"
            @prev-click="nextPage(currentPage - 1)"
            @next-click="nextPage(currentPage + 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BN from 'bignumber.js'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

import cardComponent from '@/components/card.vue'
import { TOKENS } from '@/consts'

const BigNumberFormat = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: ''
}
BN.set({ DECIMAL_PLACES: 18, ROUNDING_MODE: BN.ROUND_UP })

export default {
  name: 'app',
  components: {
    cardComponent
  },
  data () {
    const currentToken = this.$route.params.token
    return {
      URL: '',
      protocol: location.protocol,
      holders: [],
      tokensInfo: {
        XOR: {
          totalSupply: {
            v: '0',
            dp: '0'
          },
          totalHolders: 0,
          lastUpdate: 0
        },
        VAL: {
          totalSupply: {
            v: '0',
            dp: '0'
          },
          totalHolders: 0,
          lastUpdate: 0
        }
      },
      tokens: TOKENS,
      currentPage: 0,
      currentPageSize: 10,
      currentToken
    }
  },
  async created () {
    await this.getEnv()
    await this.getHolders(0, this.currentToken)
    Vue.set(this.tokensInfo, 'XOR', await this.getTotal(this.tokens.XOR))
    Vue.set(this.tokensInfo, 'VAL', await this.getTotal(this.tokens.VAL))
  },
  methods: {
    async getEnv () {
      const { data } = await axios.get('/config.json')
      this.URL = data.services.dc.value
    },
    async getHolders (page, token) {
      const { data } = await axios.get(`${this.protocol}//${this.URL}/v1/holders/${token}`, {
        params: {
          pageNumber: page,
          pageSize: this.currentPageSize
        }
      })

      if (data.status.code === 'UNKNOWN') {
        return data.status
      }

      this.holders = data.holders
      return data.status
    },
    async getTotal (token) {
      const { data } = await axios.get(`${this.protocol}//${this.URL}/v1/holders/${token}/total`)
      const { totalSupply, holders } = data
      const supply = new BN(totalSupply ? totalSupply.supply : 0)
        .toFormat(BigNumberFormat)
        .split('.')
      return {
        totalSupply: {
          v: supply[0],
          dp: supply[1] && supply[1].length ? supply[1] : '00'
        },
        totalHolders: holders,
        lastUpdate: format(parseISO(totalSupply.timestamp), 'PPpp')
      }
    },
    async nextPage (page) {
      if (page < 0) return
      const status = await this.getHolders(page, this.currentToken)
      if (status.code === 'OK') {
        this.currentPage = page
      }
    },
    async onPageSizeChange (size) {
      this.currentPageSize = size
      this.nextPage(0)
    }
  },
  filters: {
    toBNString (v) {
      return new BN(v).toFormat(BigNumberFormat)
    }
  }
}
</script>

<style lang='scss'>
@import '../node_modules/@soramitsu/soramitsu-js-ui/lib/styles/index';

@font-face {
  font-family: 'SoraB';
  src: url('./assets/fonts/Sora-Bold.otf');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'SoraEB';
  src: url('./assets/fonts/Sora-ExtraBold.otf');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'SoraSB';
  src: url('./assets/fonts/Sora-SemiBold.otf');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Sora';
  src: url('./assets/fonts/Sora-Regular.otf');
  font-weight: normal;
  font-style: normal;
}

html {
  box-sizing: border-box;
  background-color: #ffffff;
  min-height: 100vh;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: 'Sora', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #202020;
  height: 100vh;
  padding: 2rem 4rem;

  @media screen and (max-width: 375px) {
    padding: 1rem;
  }
}

.update_block {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 890px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 500px) {
    justify-content: center;
  }

  .update_block-desc {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #a1a1a0;
    letter-spacing: 0.06em;
    font-feature-settings: 'case' on;

    & .black {
      color: #202020;
    }
  }
}

.row_block {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 1px 25px;
  grid-template-areas: ".";
  margin: 2rem 0;

  @media screen and (max-width: 890px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.supply_block {
  display: flex;
  flex-direction: row;
  box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.1),
              0px 1px 4px rgba(0, 0, 0, 0.05),
              0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: 5.5rem;

  .supply_block-icon {
    border: 1px solid #dbdbdb;
    border-left-width: 0px;
    border-top-width: 0px;
    border-bottom-width: 0px;
    padding: 1rem;
  }

  .supply_block-total {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    & .title {
      text-transform: uppercase;
      font-size: 0.9rem;
    }
    & .number {
      font-size: 1.2rem;
      & .dot {
        color: #a1a1a0
      }
    }

  }
}

.logo_block {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }

  .logo_block-img {
    height: 6rem;
  }
  .desk_block-text {
    display: flex;
    flex-direction: column;
    font-size: 30px;
    padding-left: 3rem;
    max-width: 30rem;
    letter-spacing: -0.04em;
    font-feature-settings: 'tnum' on, 'lnum' on, 'salt' on, 'case' on;

    @media screen and (max-width: 500px) {
      margin-top: 1rem;
      text-align: center;
      padding-left: unset;
      align-items: center;
      font-size: 20px;
    }

    & .icon {
      width: 0.6rem;
      margin-left: 0.2rem;
    }
    & .link {
      text-decoration: unset;
      font-size: 16px;
      font-weight: 700;
      color: #D0021B;
      width: fit-content;
      letter-spacing: 0.01em;
      font-feature-settings: 'tnum' on, 'lnum' on, 'case' on, 'salt' on;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.table_block {
  padding-bottom: 1.25rem;
  .table_title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 500px) {
      flex-direction: column-reverse;
      align-items: unset;
      .sora-switch {
        margin-bottom: 1rem;
      }
    }

    .table_block-title {
      font-family: 'SoraB';
      font-weight: 700;
      font-size: 40px;
      letter-spacing: -0.02em;
      font-feature-settings: 'tnum' on, 'lnum' on, 'salt' on, 'ss01' on, 'case' on;

      @media screen and (max-width: 890px) {
        font-size: 28px;
      }
    }
  }

  .table {
    margin: 1.5rem 0;
    .table_row {
      display: grid;
      grid-template-columns: 0.2fr 1fr 1fr 0.5fr;
      grid-template-rows: 1fr;
      gap: 1px 1px;
      grid-template-areas: ". . . .";
      border: 1px solid #dddddd;
      border-top-width: 0px;
      height: 48px;
      justify-content: center;
      align-items: center;

      &.footer {
        padding: 0.5rem;
        border: 1px solid #dddddd;
        border-top-width: 0px;
        border-radius: 0px 0px 8px 8px;
        grid-template-columns: 1fr;

        .el-pagination {
          display: grid;
          grid-template-columns: 0.20fr 0.20fr 1.5fr 0fr;
          grid-template-rows: 1fr;
          gap: 0px 0px;
          grid-template-areas: ". . . . . .";
          &::before {
            display: unset;
            content: unset;
          }
        }
      }
      &.header {
        border: 1px solid #dddddd;
        border-radius: 8px 8px 0 0;
      }
      &.table_empty {
        display: flex;
        justify-content: center;
        padding: 0.5rem;
      }
    }
    .table_sticky {
      position: sticky;
      top: 0;
      background: white;

      &:last-child {
        bottom: 0;
      }
    }
    .table_header {
      font-family: 'SoraB';
      font-weight: 700;
      background-color: #ffffff;
      font-feature-settings: 'tnum' on, 'lnum' on, 'salt' on, 'case' on;
    }
    .table_footer {
      background-color: #ffffff;
    }
    .cell {
      font-size: 14px;

      border-top-width: 0;
      border-bottom-width: 0;
      border-left-width: 0;
      padding: 0.5rem;
      overflow: hidden;
      font-feature-settings: 'tnum' on, 'lnum' on, 'case' on, 'salt' on, 'ss01' on;

      &:last-child {
        border: 0;
      }
    }
  }
}

.el-select-dropdown__item {
  font-size: 0.7rem !important;
}
.el-select-dropdown__item.selected {
  color: #D0021B !important;
}
</style>
