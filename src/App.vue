<template>
  <div id="app">
    <div class="update_block">
      <img class="update_block-icon" src="@/assets/icons/info.svg"/>
      <span class="update_block-desc">Last update (every 24h): <span class="black">{{ lastUpdate }}</span></span>
    </div>
    <div class="row_block">
      <div class="supply_block">
        <div class="supply_block-icon">
          <img class="icon" src="@/assets/icons/xor.svg" alt="XOR Total Supply" />
        </div>
        <div class="supply_block-total">
          <span class="title">Total xor supply</span>
          <span class="number">{{ totalSupply }}<span class="dot">.123123</span></span>
        </div>
      </div>
      <div class="desc_block">
        <div class="desk_block-text">
          <span>Decentralized autonomous economy that works for all.</span>
          <span class="linked">Visit <a class="link" href="https://sora.org" alt="Sora.org">sora.org<img class="icon" src="@/assets/icons/external.svg"></a></span>
        </div>
      </div>
      <div class="logo_block">
        <img class="logo_block-img" src="@/assets/icons/sora.png" alt="XOR Total Supply" />
      </div>
    </div>
    <div class="table_block">
      <span class="table_block-title">SoraNet XOR holders</span>
      <div class="table">
        <div class="table_sticky">
          <div class="table_header table_row header">
            <span class="cell">#</span>
            <span class="cell">Account ID</span>
            <span class="cell">Holders Amount</span>
            <span class="cell">Total Supply Part</span>
          </div>
        </div>
        <div
          v-for="(row, index) in holders"
          :key="row.accountId"
          class="table_row"
        >
          <span class="cell">{{ index }}</span>
          <span class="cell">{{ row.accountId }} </span>
          <span class="cell">{{ row.amount }}</span>
          <span class="cell">{{ row.percentage }}%</span>
        </div>
        <div class="table_sticky">
          <div class="table_row table_footer footer">
            <span class="cell">15%</span>
          </div>
        </div>
      </div>
      <!-- <el-table
        :data="holders"
      >
        <el-table-column
          type="index"
          width="50"
          label="#"
        >
        </el-table-column>
        <el-table-column
          prop="accountId"
          label="Wallet Account ID"
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          label="Amount"
        >
        </el-table-column>
        <el-table-column
          prop="percentage"
          label="% of Total Supply">
        </el-table-column>
      </el-table> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BN from 'bignumber.js'
import format from 'date-fns/format'

export default {
  name: 'app',
  data () {
    return {
      URL: '',
      // protocol: location.protocol,
      protocol: 'https:',
      holders: [],
      totalSupply: 0,
      lastUpdate: 0
    }
  },
  created () {
    this.getEnv()
      .then(() => {
        this.getHolders()
        this.getTotal()
      })
  },
  methods: {
    async getEnv () {
      const { data } = await axios.get('/config.json')
      this.URL = data.services.dc.value
    },
    async getHolders () {
      const { data } = await axios.get(`${this.protocol}//${this.URL}/v1/holders`, {
        params: {
          pageNumber: 0,
          pageSize: 100
        }
      })
      this.holders = data.holders
    },
    async getTotal () {
      const { data } = await axios.get(`${this.protocol}//${this.URL}/v1/holders/total`)
      this.totalSupply = new BN(data.totalSupply.supply)
      this.lastUpdate = format(new Date(data.totalSupply.timestamp), 'PPpp')
    }
  }
}
</script>

<style lang='scss'>
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
}

.update_block {
  display: flex;
  align-items: center ;
  .update_block-icon {
    width: 20px;
    margin-right: 0.5rem;
  }
  .update_block-desc {
    color: #a1a1a0;

    & .black {
      color: #202020;
    }
  }
}

.row_block {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: ". . .";
  margin: 2rem 0;
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
    font-family: 'SoraSB';
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

.desc_block {
  display: flex;
  margin: 0 auto;
  max-width: 60%;
  .desk_block-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #a1a1a0;
    padding: 0.2rem 0;
    & .linked {
      line-height: 1px;
      & .link {
        color: #D0021B;
        text-decoration: unset;

        &:hover {
          text-decoration: underline;
        }
      }

      & .icon {
        width: 0.6rem;
        margin-left: 0.2rem;
      }
    }
  }
}

.logo_block {
  display: flex;
  justify-content: flex-end;
  .logo_block-img {
    height: 5.5rem;
  }
}

.table_block {
  .table_block-title {
    font-size: 2rem
  }

  .table {
    margin-top: 1.5rem;
    .table_row {
      display: grid;
      grid-template-columns: 0.2fr 1fr 1fr 0.5fr;
      grid-template-rows: 1fr;
      gap: 1px 1px;
      grid-template-areas: ". . . .";

      border: 1px solid #dddddd;
      border-top-width: 0px;

      &.footer {
        border: 1px solid #dddddd;
        border-top-width: 1px;
        border-radius: 0px 0px 8px 8px;
      }
      &.header {
        border: 1px solid #dddddd;
        border-radius: 8px 8px 0 0;
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
      font-family: 'SoraSB';
      background-color: #ffffff;
    }
    .table_footer {
      background-color: #ffffff;
    }
    .cell {
      border: 1px solid #dddddd;
      border-top-width: 0;
      border-bottom-width: 0;
      border-left-width: 0;
      padding: 0.5rem;
      overflow: hidden;

      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
