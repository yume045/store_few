<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Shopping Cart</p>
      </header>
      <section class="modal-card-body ">
        <div class="product columns" :key="product.id" v-for="(product, index) in data">
          <div style="width: 100px; height: 100px;"><img width="100" class="image" v-url="{filename: product.pic}" alt=""></div>
          <span class="column has-text-left">{{product.name}} (฿{{product.price}})</span>
          <div class="amount column is-3">
            <div class="button" @click="$emit('declese', index)">
              <b-icon type="is-danger" icon="minus-circle"></b-icon>
            </div>
            <input style="width: 50px;" class="input" :value="product.amount" disabled id="">
            <div class="button" @click="$emit('inclese', index, product.id)">
              <b-icon type="is-success" icon="plus-circle"></b-icon>
            </div>
          </div>
          <span class="column is-2 has-text-right">฿ {{product.amount*product.price}}</span>
          <div class="button is-danger" @click="$emit('delete', index)">
            <b-icon icon="delete"></b-icon>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <span class="total has-text-right">
          TotalPrice {{totalPrice}} ฿
        </span>
        <button :disabled="totalPrice == 0" @click="$emit('buy')" class="button is-success">ชำระเงิน</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    data: Array
  },
  computed: {
    totalPrice () {
      return this.data.filter(item => item.amount).reduce((prev, curr) => (prev += curr.amount * curr.price), 0)
    }
  }
}
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid grey !important;
}
.amount {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.total {
  width: 100%;
  font-weight: 500;
  margin-right: 10px;
}
</style>
