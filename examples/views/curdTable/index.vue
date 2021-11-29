<!--
 * @since: 2021-11-29 16:50:45
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-29 17:00:04
 * @文件相对于项目的路径: \financial-sx-org-webe:\npm仓库\curd-table\examples\views\curdTable\index.vue
 * @Author: ltm@xtoneict.com
 * @message: 自定义表格demo
-->
<template>
  <d2-container>
    <curd-table
      ref="table"
      :curd="curd"
      id-field="id"
      sort-field="name"
      :action-width="200"
      :actions="actions"
    >
      <template #toolbar>
        <!-- <searchBar :model="curd.formModel" /> -->
      </template>
      <el-table-column
        label="公告标题"
        prop="noticeTitle"
        width="400"
        show-overflow-tooltip
      >
        <template v-slot="scope">
          <noticeTextIcon :row="scope.row" showIcon />
        </template>
      </el-table-column>
      <el-table-column
        label="发布部门"
        prop="organizationName"
        show-overflow-tooltip
      />
      <el-table-column label="通知类别" prop="noticeTypeName" />
      <el-table-column label="发布时间" prop="noticeCreateTime" width="200" />
      <el-table-column label="置顶状态" prop="noticeStick">
        <template v-slot="scope">
          <textColor
            :value="scope.row.noticeStick"
            :enums="$enums.noticeStick"
            :colorNotes="false"
          />
        </template>
      </el-table-column>
    </curd-table>
  </d2-container>
</template>
<script>
// import {
//   noticeTopApplication, // 获取置顶申请列表
//   resolveNoticeApproval, // 取消置顶
// } from "@/api/data";
// import searchBar from "../components/searchBar"; // 搜索栏
// import confirmDate from "./confirmDate.vue"; // 确认截止日期
export default {
  components: {
    // searchBar,
    // confirmDate,
  },
  data() {
    return {
      // 查询数据
      curd: {
        query: {
          data: {},
          // 列表
          api: null,
        },
        idField: "",
        // 查询form参数
        formModel: {
          title: "",
          organization_id: 0,
          notice_type: 0,
          startDate: "",
          endDate: "",
        },
      },
      // 按钮  针对特殊按钮可自定义（多个按钮可在下面配置）
      actions: [
        {
          name: "申请置顶",
          code: "TOPPING_RESOLVE",
          iconClass: "bianjiNotcie", // 图标
          click: (row, act) => {
            this.confirmDialog(row, act);
          },
          display: (row) => {
            return row.noticeStick == 0; // 0为未申请
          },
        },
        {
          name: "取消置顶",
          code: "TOPPING_REJECT",
          iconClass: "bianjiNotcie", // 图标
          click: (row, act) => {
            this.confirmDialog(row, act);
          },
          display: (row) => {
            return row.noticeStick == 2; // 0为未申请 2为审批中
          },
        },
      ],
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    // 页面初始化
    initPage() {
      this.$refs.table.query();
    },
    // 弹窗操作
    confirmDialog(row, act) {
      this.$confirm(`是否${act.name}【${row.noticeTitle}】通知公告？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          const methodsRequest = {
            // 申请置顶
            TOPPING_RESOLVE: () => {
              // let vnode = this.$createElement(confirmDate, {
              //   props: {
              //     row: row,
              //   },
              // });
              // this.$dialog(vnode, act.name, () => {
              //   this.initPage();
              // });
            },
            // // 取消置顶
            // TOPPING_REJECT: async () => {
            //   const res = await resolveNoticeApproval();
            //   if (!res.code) {
            //     this.$message.success("取消置顶成功");
            //     this.initPage();
            //   }
            // },
          };
          methodsRequest[act.code]();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
};
</script>
<style lang="scss">
</style>
