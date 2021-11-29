<template>
  <!-- 确认截止日期 -->
  <el-form
    ref="form"
    :model="formModel"
    :rules="modelRules"
    label-width="0px"
    label-position="right"
  >
    <el-form-item prop="endDate">
      <el-date-picker
        v-model="formModel.endDate"
        type="date"
        style="width: 100%"
        placeholder="截止日期"
        :picker-options="endDatePicker"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import {
  resolveNoticeApproval, // 设置截止日期
} from "@/api/data";
export default {
  props: {
    row: {
      type: Object,
      default() {
        return null;
      },
    },
    mode: String,
  },
  data() {
    return {
      formModel: {
        endDate: null,
      },
      endDatePicker: this.processDate(),
      modelRules: {
        // 截止时间
        endDate: [
          {
            required: true,
            message: "请选择截止日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    let _this = this;
    // 初始化
    this.$on("opened", (dialog) => {
      dialog.title = "选择截止日期";
      _this.dialog.size = "800px";
    });
    // 关闭
    this.$on("closed", (dialog) => {
      _this.reset();
    });
    // 保存
    this.$on("ok", (dialog, callback) => {
      _this.$refs.form.validate(async (valid) => {
        if (valid) {
          dialog.okLoading = true;
          const { id } = this.row;
          const requestData = { ..._this.formModel, id: id };
          const response = await resolveNoticeApproval({
            data: requestData,
          });
          if (!response.code) {
            this.$message.success("置顶成功");
            callback(response.data);
            dialog.okLoading = false;
            dialog.close();
          } else {
            dialog.okLoading = false;
          }
        }
      });
    });
  },
  methods: {
    // 时间校验
    processDate() {
      return {
        disabledDate(time) {
          return time.getTime() < Date.now(); //
        },
      };
    },
    // 初始化
    reset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss">
</style>
