<template>
  <div>
    <nav-bar
      title="待办事项"
      @click-left="onClickLeft"
      :fixed="true"
      :z-index="1"
      left-arrow>
    </nav-bar>

    <div class="pageContent">
      <div class="tipWrap">
        <img alt="happyIcon" src="../assets/icon-happy.png">
        <p class="tip">可以在备注信息里唠叨唠叨今天的收获呢！</p>
      </div>

      <div class="报工日期">
        <Cell title="报工日期" is-link :value="selectedTime.toLocaleDateString()" @click="showPopup('datePicker')"></Cell>
      </div>

      <div class="projectWorkingHour"
         v-for="(item, index) in totalProjectReport"
         :key="index"
         >
          <div class="itemTitleWrap">
            <h4 class="itemTitle">
              项目报工<i class="num">{{ index + 1 }}</i>
            </h4>
            <Button
              v-if="index!== 0"
              class="textBlue delete"
              @click="removeProjectItem(index)">
              删除
            </Button>
          </div>
        <cell-group>
          <Cell title="项目/产品名称" is-link :value="item.selectedProject" @click="showPopup('projectList', index)"></Cell>
          <field v-model="item.duration" type="number" label="报工时长"></field>
          <field v-model="item.remark" label="备注信息" rows="1" type="textarea" autosize></field>
        </cell-group>

        <popup
          v-model="show"
          position="bottom"
          :overlay="true">
          <datetime-picker
            v-if="showType === 'datePicker'"
            type="date"
            v-model="selectedTime"
            @confirm="confirm"
            @cancel="cancel"
          >
          </datetime-picker>

          <picker
            v-if="showType === 'projectList'"
            :columns="projectList"
            title="项目/产品名称"
            :show-toolbar="true"
            :visible-item-count="6"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @cancel="cancel"
            @confirm="confirm">
          </picker>
        </popup>
      </div>

      <Button size="large" @click="add" class="textBlue">+ 增加报工</Button>
    </div>

    <div class="fixed-toolbar">
      <div class="sumWorkingHourWrap">
        <div class="sumWorkingHour">
          <label>今日汇总工时</label>
          <span class="time">{{ sumWorkingHour }}</span>
          <label>h</label>
        </div>
        <Button type="info" @click="submit">完成今日报工</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Popup, Cell, CellGroup, DatetimePicker, Picker, Field, Button } from 'vant'

export default {
  name: 'report-working-hour',

  components: {
    NavBar,
    Popup,
    Cell,
    CellGroup,
    DatetimePicker,
    Picker,
    Field,
    Button
  },

  data () {
    return {
      show: false,
      showType: '',
      selectedTime: new Date(),
      popIndex: '',
      projectList: [
        { text: '项目/产品名称1' },
        { text: '项目/产品名称2' },
        { text: '项目/产品名称3' },
        { text: '项目/产品名称4' },
        { text: '项目/产品名称5' },
        { text: '项目/产品名称6' },
        { text: '项目/产品名称7' }
      ],
      initProjectReport: {
        selectedProject: '项目/产品名称1',
        duration: 4.0,
        remark: '',
        reportDay: ''
      },
      totalProjectReport: [
        {
          selectedProject: '项目/产品名称1',
          duration: 4.0,
          remark: '',
          reportDay: ''
        },
        {
          selectedProject: '项目/产品名称1',
          duration: 4.0,
          remark: '',
          reportDay: ''
        }
      ]
    }
  },

  methods: {
    onClickLeft () {
      console.log('back to last page')
    },

    showPopup (type, index) {
      this.show = true
      this.showType = type
      this.popIndex = index
    },

    hidePopup () {
      this.show = false
    },

    cancel () {
      this.hidePopup()
    },

    confirm (value, index) {
      if (this.showType === 'projectList') {
        this.totalProjectReport[this.popIndex].selectedProject = value.text
      }
      this.hidePopup()
    },

    add () {
      let projectItem = Object.assign({}, this.initProjectReport)
      this.totalProjectReport.push(projectItem)
    },

    removeProjectItem (index) {
      this.totalProjectReport.splice(index, 1)
    },

    submit () {
      this.totalProjectReport.forEach(item => {
        item.reportDay = this.selectedTime.toLocaleDateString()
      })

      Vue.api.dailyWork.saveTask(this.totalProjectReport).then(res => {
        console.log('save succesfully!')
      })
    }
  },

  computed: {
    sumWorkingHour () {
      let sumTemp = 0
      this.totalProjectReport.forEach(item => {
        sumTemp = sumTemp + Number(item.duration)
      })
      return sumTemp
    }
  },

  mounted () {
    Vue.api.dailyWork.queryTaskListByPage().then(res => {
      console.log('dailyWork.queryTaskListByPage')
    })
  }
}
</script>
<style lang="scss">
  .van-nav-bar__title {
    font-size: 18px;
  }

  .tipWrap {
    display: flex;
    padding: 5px 15px;
    vertical-align: middle;
    height: 25px;
    line-height: 25px;
    color: #4c84ff;
    font-size: 13px;
    background-color: #edf2ff;

    img {
      width: 25px;
      margin-right: 5px;
    }

    .tip {
      margin: 0;
    }
  }

  .pageContent {
    padding-top: 2.875rem;
    padding-bottom: 2.875rem;
  }

  .van-cell__title {
    text-align: left;
  }

  .itemTitleWrap {
    display: flex;
    justify-content: space-between;
  }

  .itemTitle {
    padding: 11px 15px;
    color: #848484;
    font-size: 14px;
    line-height: 22px;
    margin: 0;
    text-align: left;

    .num {
      display: inline-block;
      border: 1px solid #b5b5b5;
      border-radius: 50%;
      width: 13px;
      height: 13px;
      line-height: 13px;
      text-align: center;
      margin-left: 5px;
    }
  }

  .delete {
    border: none;
  }

  .van-field__control {
    text-align: right;
  }

  .textLeft {
    .van-field__control {
      text-align: left;
    }
  }

  .sumWorkingHourWrap {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 0.05rem rgba(0,0,0,.1);
  }

  .sumWorkingHour {
    display: flex;
    align-items: center;
    padding-left: 5px;

    .time {
      margin-left: 6px;
      margin-right: 6px;
      color: #4c84ff;
    }
  }

  .fixed-toolbar {
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .textBlue {
    color: #4c84ff;
  }
</style>
