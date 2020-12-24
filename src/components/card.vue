<template>
  <div :class="['sora-card', isActive ? 'active' : '']" >
    <div class="card_icon">
      <img :src="require(`@/assets/icons/${icon}.svg`)" />
    </div>
    <div class="card_desc">
      <span class="card_desc-title">TOTAL {{ token.toUpperCase() }} SUPPLY</span>
      <span class="card_desc-amount">{{ supply.v }}.{{ supply.dp }}</span>
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

  &.active {
    background: #F5F7F8;
  }

  &:not(.active):hover {
    cursor: pointer;
  }

  &.active .card_overlay {
    position: absolute;
    top: 0px;
    height: 4px;
    width: 100%;
  }

  .card_icon {
    display: flex;
    padding: 0 8px;
  }

  .card_desc {
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    border-left: 1px solid #DDDDDD;
    width: 75%;

    .card_desc-title {
      font-size: 14px;
      font-weight: 700;

      @media screen and (max-width: 500px) {
        font-size: 10px;
      }
    }
    .card_desc-amount {
      font-size: 30px;
      font-weight: 700;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      @media screen and (max-width: 500px) {
        font-size: 25px;
      }
    }
  }
}
</style>
