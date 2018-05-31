<template>
  <div class="hello">
   <router-link to="/stock"> <div class ="plus">
     <b-icon
                icon="plus-circle"
                size="is-large">
      </b-icon>
    </div>
    </router-link>
    <div class="container">
    <img src = "/static/cat.jpg" width="300">
    <div class="columns is-centered is-multiline">
      <div class="column is-4" :key="key" v-for="(Product, key) in Products">
        <div class="card widthcard is-centered">
          <div class="card-image">
            <figure class="image is-4by3">
              <img v-url={filename:Product.pic} />
            </figure>
          </div>
          <div class="card-content">
            <div>
              <div class="title is-4 has-text-left">{{Product.name}}
              </div>
              <div class="columns">
                <span class="column title is-6 has-text-left has-text-danger">฿{{Product.price}}
                </span>
                <span class="column title is-6 has-text-right">จำนวน {{Product.amount}}
                </span>
              </div>
            </div>
          </div>

          <footer class="card-footer">
            <div :class="{
              'disableSelect': Product.amount <= 0
            }" @click="addToBucket(key)" class="card-footer-item orange">Select Product</div>
          </footer>
        </div>
      </div>
    </div>
    <div class="bucket" @click="isComponentModalActive = true">
      <img src="/static/baskets.png" width="50" alt="">
      <span v-if="bucketCount" class="count">{{bucketCount}}</span>
    </div>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <bucket :data="bucket" @buy="buy" @inclese="incleseAmount" @declese="decleseAmount" @delete="deleteInBucket" />
    </b-modal>
  </div>
  </div>
</template>

<script>
import bucket from './bucket'
export default {
  name: 'SellProduc',
  components: {
    bucket
  },
  data () {
    return {
      isComponentModalActive: false,
      database: {},
      storageRef: {},
      productRef: {},
      Products: {},
      bucket: []
    }
  },
  computed: {
    bucketCount () {
      return this.bucket.reduce((prev, curr) => (prev += curr.amount), 0)
    }
  },
  methods: {
    addToBucket (id) {
      const index = this.bucket.findIndex(item => item.id === id)
      if (this.Products[id].amount <= 0) {
        console.log('ของหมด')
      } else if (index !== -1) {
        if (this.bucket[index].amount < this.Products[id].amount) {
          this.bucket[index].amount++
        }
      } else {
        this.bucket.push({
          id: id,
          name: this.Products[id].name,
          pic: this.Products[id].pic,
          price: this.Products[id].price,
          amount: 1
        })
      }
    },
    incleseAmount (index, id) {
      if (this.bucket[index].amount < this.Products[id].amount) {
        this.bucket[index].amount++
      }
    },
    decleseAmount (index) {
      if (this.bucket[index].amount > 0) {
        this.bucket[index].amount--
      }
    },
    deleteInBucket (index) {
      this.bucket.splice(index, 1)
    },
    async buy () {
      await this.bucket.forEach(async item => {
        const lastAmount = this.Products[item.id].amount - item.amount
        await this.productRef.child(item.id).update({ amount: lastAmount })
      })
      this.bucket = []
      this.isComponentModalActive = false
    }
  },
  created () {
    this.database = this.$firebase.database()
    this.storageRef = this.$firebase.storage().ref()
    this.productRef = this.database.ref('/Products')
    this.productRef.on('value', snapshot => {
      this.Products = snapshot.val()
    })
  }
}
</script>

<style>
.count {
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 50%;
  background-color: red;
  padding: 2px 8px 0px 8px;
  color: white;
}
.bucket {
  position: fixed;
  top: 540px;
  right: 20px;
  border: 2px solid #fc7713;
  cursor: pointer;
  padding: 8px 8px 5px 8px;
  border-radius: 15px;
  opacity: 0.7;
}
.bucket:hover {
  opacity: 1;
}
.orange:hover {
  background-color: #fc7713;
  cursor: pointer;
  color: white;
}
.disableSelect {
  cursor: not-allowed;
  background: hsl(348, 100%, 61%);
  color: white;
}
.plus{
position: absolute;
  top: 25px;
  right: 100px;
}
</style>
