<template>
  <div class="sora-card" >
    <div class="card_icon">
      <img :src="require(`@/assets/icons/${icon}.svg`)" />
    </div>
    <div class="card_desc">
      <span class="card_desc-title">TOTAL {{ token.toUpperCase() }} SUPPLY</span>
      <span class="card_desc-amount">{{ supply.v }}.<span class="grey">{{ supply.dp }}</span></span>
    </div>
    <div class="card_overlay" :style="overlayStyle" />
  </div>
</template>

<script>
import { TOKENS } from '@/consts'

export default {
  name: 'sora-card',
  props: {
    currentToken: {
      type: String,
      required: true,
      default: ''
    },
    token: {
      type: String,
      required: true,
      default: ''
    },
    supply: {
      type: Object,
      required: true,
      default: () => ({
        v: '0',
        dp: '0'
      })
    }
  },
  computed: {
    isActive () {
      return this.token === this.currentToken
    },
    icon () {
      return this.token
    },
    overlayStyle () {
      if (this.token === TOKENS.XOR) {
        return 'background-color: #D0021B'
      }
      return `
        background: linear-gradient(161.92deg, #9F651A 1.97%, #F9F097 97.8%);
      `
    }
  }
}
</script>

<style lang="scss" scoped>
.sora-card {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 88px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.1),
              0px 1px 4px 0px rgba(0, 0, 0, 0.05),
              0px 1px 1px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .card_icon {
    display: flex;
    padding: 0 8px;
  }

  .card_desc {
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    border-left: 1px solid #DDDDDD;
    width: 90%;

    .card_desc-title {
      font-family: 'SoraB';
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.01em;
      font-feature-settings: 'tnum' on, 'lnum' on, 'case' on;

      @media screen and (max-width: 500px) {
        font-size: 10px;
      }
    }
    .card_desc-amount {
      font-family: 'SoraB';
      font-size: 30px;
      font-weight: 700;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      letter-spacing: -0.04em;
      font-feature-settings: 'tnum' on, 'lnum' on, 'salt' on, 'case' on;

      .grey {
        color: #a3a4a8;
      }

      @media screen and (max-width: 500px) {
        font-size: 25px;
      }
    }
  }
}
</style>
