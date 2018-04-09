// components/layer.js
Component({
  properties: {
    modalShow: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: "提示"
    },
    inputList: {
      type: Object,
      value: {
        type: "text",
        textContent: "",     //text 值
        name: "",              //label 的名字
        placeholder: "",  //placeholder的值
        phone: "",              //label 的名字
        placeholder1: "",  //placeholder1的值
        company: "",              //label 的名字
        placeholder2: "",  //placeholder2的值
      }
    }
  },
  data: {
    name: '',
    phone: '',
    company: ''
  },
  methods: {
    inputVal(e) {
      let name = e.detail.value;
      this.setData({
        name: name
      })
    },
    inputVal1(e){
      let phone = e.detail.value;
      this.setData({
        phone: phone
      })
    },
    inputVal2(e) {
      let company = e.detail.value;
      this.setData({
        company: company
      })
    },
    confirm() {
      let val = {
        name: this.data.name,
        phone: this.data.phone,
        company: this.data.company
      }
      this.triggerEvent("myeventBox", val);
    },
    cancel() {
      this.setData({
        modalShow: false
      })
    }
    // 这里放置自定义方法  

  }
}) 