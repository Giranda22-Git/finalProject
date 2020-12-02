<template>
  <div class="wrapper">
    <div class="background3D">
      <div class="wrapper-info">
        <div class="avatar"></div>
        <div class="user-data">
          <div class="data uid">{{ userData._id }}</div>
          <div class="data cash"> {{ userData.cash }} </div>
          <div class="data login"> {{ userData.Login._login }} </div>
          <div class="data password"> {{ userData.Password._password }} </div>
        </div>
      </div>
      <div class="wrapper-data-charts">
        <canvas class="chart" id="freshAuctions"></canvas>
        <canvas class="chart" id="lostAuctions"></canvas>
        <canvas class="chart" id="wonAuctions"></canvas>
        <canvas class="chart" id="participatedAuctions"></canvas>
      </div>
      <form onsubmit="return false">
        <fieldset>
          <legend>create auction</legend>
          <label for="file"> {{ filecount }} </label>
          <input name="files" type="file" style="display: none" id="file" @change="handleFileUpload" ref="file" multiple required>
          <input class="title" placeholder="  Title" type="text" required ref="title">
          <input class="description" placeholder="  Description" type="text" required ref="description">
          <label for="startTime">start time</label>
          <input id="startTime" type="datetime-local" required ref="startTime">
          <label for="endTime">end time</label>
          <input id="endTime" type="datetime-local" required ref="endTime">
          <input class="startedPrice" placeholder="started price" type="number" required ref="startedPrice">
          <input class="startedPriceForStep" placeholder="started price for step" type="number" required ref="startedPriceForStep">
          <progress max="100" :value.prop="uploadPercentage"></progress>
          <input type="submit" value="send" @click="send">
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sweetalert2 from 'sweetalert2'
export default {
  name: 'personalArea',
  data: () => ({
    file: null,
    filedata: null,
    filecount: 'выберите файл',
    uploadPercentage: 0
  }),
  props: {
    userData: {
      type: Object,
      default: () => ({
        _id: 0,
        cash: 0,
        Login: {
          _login: null
        },
        Password: {
          _password: null
        }
      })
    }
  },
  methods: {
    handleFileUpload () {
      if (this.$refs.file.files.length === 0) this.file = null
      else {
        this.file = this.$refs.file.files
        this.filecount = this.file.length
      }
    },
    async send () {
      if (this.file) {
        const formData = new FormData()
        this.file.forEach(element => {
          formData.append('files', element)
        })
        formData.append('title', this.$refs.title.value)
        formData.append('description', this.$refs.description.value)
        formData.append('startTime', this.$refs.startTime.value)
        formData.append('endTime', this.$refs.endTime.value)
        formData.append('startedPrice', this.$refs.startedPrice.value)
        formData.append('startedPriceForStep', this.$refs.startedPriceForStep.value)
        formData.append('owner', JSON.parse(localStorage.getItem('userData'))._id)
        console.log(formData)
        await axios.post('http://localhost:3000/auctions',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            }.bind(this)
          }
        )
          .then(response => {
            if (response.data !== null) {
              this.filedata = response.data
              sweetalert2.fire({
                title: 'OK',
                text: 'ваш аукцион был успешно инициирован',
                icon: 'success',
                confirmButtonText: 'OK'
              })
            }
          })
          .catch(() => {
            sweetalert2.fire({
              title: 'Error',
              text: 'Ошибка неизвестного характера',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          })
        this.filedata = null
        this.file = null
        this.filename = 'выберите файл'
        this.uploadPercentage = 0
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    height: calc( 100vh - 150px )
    perspective: 500px
    transform-style: preserve-3d
    color: white
    font-size: 3.5rem
    .background3D
      width: 64%
      height: 100%
      margin: 0 auto
      border: 1px solid rgba(255, 255, 255, 0.2)
      box-shadow: 0 0 500px 15px rgba(60, 40, 150, 0.6)
      transform: rotateX(20deg) translateY(-10.5%)
      overflow-y: auto
      padding: 2%
      text-align: justify
      overflow-x: hidden
      overflow-y: auto
      &::-webkit-scrollbar
        width: 0rem
      .wrapper-info
        width: 100%
        height: 40%
        display: flex
        justify-content: space-between
        align-items: center
        .avatar
          width: 30%
          height: 100%
          background: url(../assets/avatar.jpeg) center no-repeat
          background-size: cover
        .user-data
          width: 70%
          height: 100%
          display: flex
          flex-wrap: wrap
          justify-content: center
          align-items: center
          .data
            width: 50%
            height: 50%
      .wrapper-data-charts
        width: 100%
        height: auto
        display: flex
        flex-direction: column
        .chart
          width: 100%
          height: 50vh
      form
        fieldset
          width: 100%
          height: auto
          display: flex
          flex-direction: column
          justify-content: space-between
</style>
