<template>
  <div class="sora-switch">
    <input
      @change="onTokenChange"
      type="radio"
      class="switch-input"
      name="view3"
      :value="tokens.VAL"
      id="VAL"
      :checked="currentToken === tokens.VAL"
    >
    <label for="VAL" class="switch-label switch-label-off">{{ tokens.VAL.toUpperCase() }}</label>
    <input
      @change="onTokenChange"
      type="radio"
      class="switch-input"
      name="view3"
      :value="tokens.XOR"
      id="XOR"
      :checked="currentToken === tokens.XOR"
    >
    <label for="XOR" class="switch-label switch-label-on">{{ tokens.XOR.toUpperCase()  }}</label>
    <span class="switch-selection"></span>
  </div>
</template>

<script>
import { TOKENS } from '@/consts'

export default {
  name: 'sora-switch',
  props: {
    currentToken: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      tokens: TOKENS
    }
  },
  methods: {
    onTokenChange (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.sora-switch {
  position: relative;
  height: 32px;
  width: 185px;
  background: #F5F7F8;
  border-radius: 9px;
  & .switch-label {
    position: relative;
    z-index: 2;
    float: left;
    width: calc(100% / 2);
    line-height: 32px;
    font-size: 14px;
    font-weight: 700;
    color: #2D2926;
    text-align: center;
    cursor: pointer;
  }

  & .switch-label-off {
    padding-left: 2px;
  }

  & .switch-label-on {
    padding-right: 2px;
  }

  & .switch-input {
    display: none;
  }
  & .switch-input:checked + .switch-label-on ~ .switch-selection {
    left: 90px;
    /* Note: left: 50%; doesn't transition in WebKit */
  }

  & .switch-selection {
    position: absolute;
    z-index: 1;
    top: 2px;
    left: 2px;
    display: block;
    width: calc(100% / 2);
    height: 28px;
    background: #FFFFFF;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    border-radius: 7px;
    transition: left 0.15s ease-out;
  }
}
</style>
