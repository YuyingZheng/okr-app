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
        <h4 class="itemTitle">
          项目报工<i class="num">{{ index + 1 }}</i>
        </h4>
        <cell-group>
          <Cell title="项目/产品名称" is-link :value="item.selectedProject" @click="showPopup('projectList', index)"></Cell>
          <field v-model="item.workigHour" type="number" label="报工时长"></field>
          <field v-model="item.comment" label="备注信息" rows="1" type="textarea" autosize></field>
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
            :columns="item.projectList"
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

      <Button size="large" @click="add">+ 增加报工</Button>
    </div>

    <!-- <nav-bar
      title="待办事项"
      :z-index="1"
      >
    </nav-bar> -->
  </div>
</template>
<script>
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
      initProjectReport: {
        selectedProject: '项目/产品名称1',
        projectList: [
          { text: '项目/产品名称1' },
          { text: '项目/产品名称2' },
          { text: '项目/产品名称3' },
          { text: '项目/产品名称4' },
          { text: '项目/产品名称5' },
          { text: '项目/产品名称6' },
          { text: '项目/产品名称7' }
        ],
        workigHour: 4.0,
        comment: ''
      },
      totalProjectReport: [
        {
          selectedProject: '项目/产品名称1',
          projectList: [
            { text: '项目/产品名称1' },
            { text: '项目/产品名称2' },
            { text: '项目/产品名称3' },
            { text: '项目/产品名称4' },
            { text: '项目/产品名称5' },
            { text: '项目/产品名称6' },
            { text: '项目/产品名称7' }
          ],
          workigHour: 4.0,
          comment: ''
        },
        {
          selectedProject: '项目/产品名称1',
          projectList: [
            { text: '项目/产品名称1' },
            { text: '项目/产品名称2' },
            { text: '项目/产品名称3' },
            { text: '项目/产品名称4' },
            { text: '项目/产品名称5' },
            { text: '项目/产品名称6' },
            { text: '项目/产品名称7' }
          ],
          workigHour: 4.0,
          comment: ''
        }
      ]
    }
  },

  methods: {
    onClickLeft () {
      console.log('111')
    },

    showPopup (type, index) {
      this.show = true
      this.showType = type
      this.popIndex = index
      console.log(type, this.showType)
    },

    hidePopup () {
      this.show = false
    },

    cancel () {
      this.hidePopup()
    },

    confirm (value, index) {
      console.log(value)
      if (this.showType === 'projectList') {
        this.totalProjectReport[this.popIndex].selectedProject = value.text
      }
      this.hidePopup()
    },

    add () {
      let projectItem = Object.assign({}, this.initProjectReport)
      this.totalProjectReport.push(projectItem)
      console.log(this.totalProjectReport)
    }
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
  }

  .van-cell__title {
    text-align: left;
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

  .van-field__control {
    text-align: right;
  }
</style>
