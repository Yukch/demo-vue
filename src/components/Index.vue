<template>
  <div class="IndexMain">
    
    <div class="amountDiv">

      <p class="amount">{{ amountBefore }}<i class="amountAfter">{{ amountAfter }}</i></p>

      <p class="amount">{{ paidBefore }}<i class="amountAfter">{{ paidAfter }}</i></p>      
      <p class="amount">{{ hash }}<i class="amountAfter"> KH/s</i></p>
    </div>

    <el-button :icon="refreshStatButtonIcon"
        circle v-bind:class="{refreshStatButton: true}" @click="refreshStat">
    </el-button>     
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      value: 0,
      amount: 0,
      paid: 0,
      hash: 0,
      isStatLoading: false,
    }
  },
  computed: {
    refreshStatButtonIcon: function () {
        if(this.isStatLoading) {
            return 'el-icon-loading'
        } 
        return 'el-icon-refresh-right'
    },
    amountBefore() {
      let aStr = this.amount.toString()
      let len = aStr.length
      let beforeStr = aStr.substring(0, len-6)
      let blen = beforeStr.length
      while(blen < 7){
        beforeStr = '0' + beforeStr
        blen++
      }
      beforeStr = beforeStr.substring(0, blen-6) + '.' + beforeStr.substring(blen-6, blen)
      return beforeStr
    },
    amountAfter() {
      let aStr = this.amount.toString()
      let len = aStr.length
      let AfterStr = aStr.substring(len-6, len)
      let Alen = AfterStr.length
      while(Alen < 6){
        AfterStr = '0' + AfterStr
        Alen++
      }
      return AfterStr
    },
    paidBefore() {
      let pStr = this.paid.toString()
      let len = pStr.length
      let beforeStr = pStr.substring(0, len-6)
      let blen = beforeStr.length
      while(blen < 7){
        beforeStr = '0' + beforeStr
        blen++
      }
      beforeStr = beforeStr.substring(0, blen-6) + '.' + beforeStr.substring(blen-6, blen)
      return beforeStr
    },
    paidAfter() {
      let pStr = this.paid.toString()
      let len = pStr.length
      let AfterStr = pStr.substring(len-6, len)
      let Alen = AfterStr.length
      while(Alen < 6){
        AfterStr = '0' + AfterStr
        Alen++
      }
      return AfterStr
    }

  },
  mounted() {
    this.refreshStat()
  },
  methods: {
    hello () {
        this.$axios.get('/api/hello').then((response)=>{
            console.log(response);
            this.value = response.data
        })
    },
    refreshStat() {
      var _this = this
      this.isStatLoading = true
      // this.amount = 9227608440
      // this.paid = 2918000451
      this.$axios.get('https://api.c3pool.com/miner/892rvTwz8EtRmTS7zFy9R2HhTgEYjum8bXcYRtHxpow8Y8xQ4qjf5yKj4WM2vaAwJi6Y984c5c1SU82DcyrWGdrwH9zSaQ5/stats').then((response)=>{
        _this.amount = response.data.amtDue
        _this.paid = response.data.amtPaid
        _this.hash = (response.data.hash2 / 1000).toFixed(3)
        _this.isStatLoading = false
        _this.$notify({
            // title: 'ERROR',
            // message: 'ERROR',
            type: 'info',
            position: 'top-right',
            offset: 240,
            customClass: "infoNotify",
            showClose: false,
            duration: 1500
        });
        // console.log(response.data)
      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .IndexMain {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .slider {
        float: right;
        height: 300px;
    }

    .amountDiv {
      margin-top: -150px;
    }

    .amount {
      margin: 0px;
      font-size: 20px;
      font-weight: bold;
      /* text-align: left; */
      font-style: normal;
    }
    
    .amountAfter {
      font-size: 15px;
      font-weight: normal;
      font-style: normal;
      /* text-decoration: underline; */
    }

    .refreshStatButton {
        height: 50px;
        width: 50px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 20px;
    }

    .infoNotify {
        width: 50px;
    }
</style>
