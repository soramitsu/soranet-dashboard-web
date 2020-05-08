<template>
  <div id="app">
    <div>
      <div class="sora_logo">
        <img src="@/assets/icons/logo.svg" alt="Sora - The Decentralized Autonomous Economy">
        <span class="sora_logo-text">On this page SoraNet accounts with XOR are listed in descending order.</span>
      </div>
      <div class="sora_row">
        <div class="sora_block sora_total-block">
          <div class="sora_total-left">
            <img src="@/assets/icons/xor-icon.svg" class="sora_total-img" alt="XOR Total Supply" />
          </div>
          <div class="sora_total-right">
            <span class="sora_title small">Total Supply</span>
            <span class="sora_total-amount">{{ Number(this.totalSupply || 0).toLocaleString() }}</span>
          </div>
        </div>
        <div class="sora_block">
         Last update (every 24hr):<br><b>{{ lastUpdate }}</b>
        </div>
      </div>
      <div class="sora_block sora_table-block">
        <span class="sora_title">XOR holders in SoraNet</span>
        <el-table
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
        </el-table>
      </div>
    </div>
    <div class="sora_footer">
      <span>Sora - The Decentralized Autonomous Economy</span>
      <a href="https://sora.org/" class="sora_footer-link" alt="Sora.org">Sora.org</a>
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
      const { data } = await axios.get(`${location.protocol}//${this.URL}/v1/holders`, {
        params: {
          pageNumber: 0,
          pageSize: 100
        }
      })
      this.holders = data.holders
    },
    async getTotal () {
      const { data } = await axios.get(`${location.protocol}//${this.URL}/v1/holders/total`)
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
  background-color: #F2F7F7;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.sora_block {
  background-color: #ffffff;
  margin: 1rem;
  padding: 1rem;
  border-radius: 20px;
  flex-grow: 1;
}

.sora_title {
  font-family: 'SoraB';
  font-size: 1.4rem;
  font-weight: 500;

  &.small {
    font-size: 1rem;
  }
}

.sora_footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background-color: #202020;
  padding: 2rem;
  color: #ffffff;

  .sora_footer-link {
    color: #D0021B;
  }
}

.sora_logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;

  .sora_logo-text {
    text-align: center;
    align-self: center;
    padding: 0.5rem;
    font-size: 0.9rem;
    width: 50%;
  }
}

.sora_row {
  display: flex;
  flex-direction: row;
}

.sora_total-block {
  padding: 0;
  display: flex;
  height: 5rem;

  .sora_total-img {
    width: 32px;
    height: 32px;
  }

  .sora_total-left {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D0021B;
    min-width: 10%;
    border-radius: 20px 0 0 20px;
  }

  .sora_total-right {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .sora_total-amount {
      font-size: 1.5rem;
    }
  }
}

/* ELEMENT UI STYLES */
.el-table .el-table__header thead,
.el-table .el-table__row {
  color: #202020;
}
</style>
