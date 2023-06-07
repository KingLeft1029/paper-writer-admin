<!--
 * @Author: mikeShn
 * @Date: 2022-04-18 10:43:37
 * @LastEditTime: 2022-04-24 14:02:04
 * @FilePath: \digital-earth-PC\src\views\allocation\basicConfig\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="system-set">
    <div class="border">
      <div class="title">{{ $t("TRESHOLD_SETTING") }}</div>
      <div class="container">
        <el-form :model="threshold" label-width="500px" ref="threshold">
          <el-form-item
            :label="`${$t('COMMUNICATED_TRACKER_STATUS')}：`"
            prop="relateTrackerFlag"
            :rules="[
              {
                required: true,
                message: $t('SELECT_ASSOCIATED'),
                trigger: 'blur',
              },
            ]"

          >
            <el-radio-group v-model="threshold.relateTrackerFlag">
              <el-radio label="1">{{ $t("COMMUNICATED") }}</el-radio>
              <el-radio label="0">{{ $t("NON_COMMUNICATED") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="`${$t('OPERATION_TIME_SET')}:`">
            <el-time-select
              :placeholder="$t('START_TIME')"
              v-model="threshold.startTime"
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59',
              }"
            >
            </el-time-select>
            —
            <el-time-select
              :placeholder="$t('END_TIME')"
              v-model="threshold.endTime"
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59',
                minTime: threshold.startTime,
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item
            :label="$t('FORECAST_MAX') + '：'"
            prop="preWindAlarmValue"
            :rules="[
              {
                required: true,
                message: `${$t('PLEASE_INPUT')} ${$t('FORECAST_MAX')}`,
                trigger: 'blur',
              },
              { validator: checkAge, trigger: 'blur' },
            ]"
          >
            <div>
              <el-radio-group v-model="threshold.relatePreWindSpeed">
                <el-radio label="1">{{ $t("COMMUNICATED") }}</el-radio>
                <el-radio label="0">{{ $t("NON_COMMUNICATED") }}</el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-input
                v-model="threshold.preWindAlarmValue"
                :placeholder="`${$t('PLEASE_INPUT')} ${$t('FORECAST_MAX')}`"
              >
              </el-input>
              <span>m/s</span>
            </div>
          </el-form-item>
          <el-form-item
            :label="$t('MAX_WIND') + '：'"
            prop="windAlarmValue"
            :rules="[
              {
                required: true,
                message: `${$t('PLEASE_INPUT')} ${$t('MAX_WIND')}`,
                trigger: 'blur',
              },
              { validator: checkAge, trigger: 'blur' },
            ]"
          >
            <div>
              <el-radio-group v-model="threshold.relateWindSpeed">
                <el-radio label="1">{{ $t("COMMUNICATED") }}</el-radio>
                <el-radio label="0">{{ $t("NON_COMMUNICATED") }}</el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-input
                v-model="threshold.windAlarmValue"
                :placeholder="`${$t('PLEASE_INPUT')} ${$t('MAX_WIND')}`"
              >
              </el-input>
              <span>m/s</span>
            </div>
          </el-form-item>
          <el-form-item
            :label="$t('MAX_FORECAST_RAINFALL')+'：'"
            prop="prePrecipitationAlarmValue"
            :rules="[
              {
                required: true,
                message: $t('PLEASE_INPUT_FORECAST_RAINFALL'),
                trigger: 'blur',
              },
              { validator: checkAge, trigger: 'blur' },
            ]"
          >
            <div>
              <el-radio-group v-model="threshold.relatePrePrecipitation">
                <el-radio label="1">{{ $t("COMMUNICATED") }}</el-radio>
                <el-radio label="0">{{ $t("NON_COMMUNICATED") }}</el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-input
                v-model="threshold.prePrecipitationAlarmValue"
                :placeholder="$t('PLEASE_INPUT_FORECAST_RAINFALL')"
              >
              </el-input>
              <span>mm</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button
          type="primary"

          @click="submit('threshold')"
        >{{ $t("Confirm") }}
        </el-button
        >
        <el-button @click="$router.go(-1)">{{ $t("Cancel") }}</el-button>
      </div>
    </div>

    <div class="border">
      <div class="title">{{ $t("DATA_STORAGE_SETTING") }}</div>
      <div class="container">
        <el-form label-width="500px" :model="dataStored" ref="dataStored">
          <el-form-item
            prop="dataSaveDays"
            :label="$t('DATABASE_STORAGE_CYCLE') + '：'"
            :rules="[{ validator: checkDays, trigger: 'blur' }]"
          >
            <el-input
              v-model.number="dataStored.dataSaveDays"
              :placeholder="$t('DATABASE_STORAGE_CYCLE')"
            >
            </el-input>
            <span>{{ $t("DAY") }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button
          type="primary"

          @click="submit('dataStored')"
        >{{ $t("Confirm") }}
        </el-button
        >
        <el-button @click="$router.go(-1)">{{ $t("Cancel") }}</el-button>
      </div>
    </div>
    <div class="border">
      <div class="title">{{ $t("MAINPAGE_DATA_DISPLAY_SET") }}</div>
      <div class="container">
        <el-form label-width="450px" ref="bigData">
          <el-form-item prop="chartsType">
            <el-radio-group v-model="bigData.chartsType">
              <el-radio label="2">{{ $t("WIND_SPEED_TREND_CHART") }}</el-radio>
              <el-radio label="1">{{ $t("RAINFALL_TREND_CHART") }}</el-radio>
              <el-radio label="0">{{ $t("TEMPERATURE_TREND_CHART") }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button
          type="primary"

          @click="submit('bigData')"
        >{{ $t("Confirm") }}
        </el-button
        >
        <el-button @click="$router.go(-1)">{{ $t("Cancel") }}</el-button>
      </div>
    </div>
    <div class="border">
      <div class="title">{{ $t("LOCARION_EDIT") }}</div>
      <div class="container">
        <el-form label-width="500px" ref="project">
          <el-form-item>
            <el-button type="primary"  @click="dataImport">{{ $t("LOCARION_IMPORT") }}</el-button>
            <el-button type="primary"  @click="exportTemplate">{{ $t("LOCARION_EXPORT") }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="border">
      <div class="title">{{ $t("EDIT_PROJECT_NAME") }}</div>
      <div class="container">


        <el-form label-width="500px" ref="project">

          <el-form-item prop="projectName" :label="$t('PROJECT_NAME') + '：'">
            <el-input
              v-model="project.projectName"
              :placeholder="$t('INPUT_PRJECT_NAME')"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="projectName" :label="$t('LOCARION_FAIL') + '：'">
            <el-switch
              active-value="1"
              inactive-value="0"
              v-model="project.isForShow"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div class="button">
        <el-button
          type="primary"

          @click="submit('project')"
        >{{ $t("Confirm") }}
        </el-button
        >
        <el-button @click="$router.go(-1)">{{ $t("Cancel") }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {editConfig, getConfig} from "@/api/system/systemSet";
import {importData} from "@/api/robot";
import request from "@/utils/request";

export default {
  data() {
    return {
      threshold: {
        preWindAlarmValue: null,
        relateTrackerFlag: null,
        startTime: null,
        endTime: null,
        relatePreWindSpeed: null,
        relateWindSpeed: null,
        windAlarmValue: null,
        relatePrePrecipitation: null,
        prePrecipitationAlarmValue: null,
      },
      dataStored: {
        dataSaveDays: 180,
      },
      bigData: {
        chartsType: null,
      },
      point: {
        projectName: null,
      },
      project: {
        projectName: null,
        isForShow: null
      },
    };
  },
  components: {},

  created() {
    getConfig().then((res) => {
      this.threshold.preWindAlarmValue = res.data.preWindAlarmValue;
      this.threshold.relateTrackerFlag = res.data.relateTrackerFlag;
      this.threshold.startTime = res.data.startTime;
      this.threshold.endTime = res.data.endTime;
      this.threshold.relatePreWindSpeed = res.data.relatePreWindSpeed;
      this.threshold.relateWindSpeed = res.data.relateWindSpeed;
      this.threshold.windAlarmValue = res.data.windAlarmValue;
      this.threshold.relatePrePrecipitation = res.data.relatePrePrecipitation;
      this.threshold.prePrecipitationAlarmValue =
        res.data.prePrecipitationAlarmValue;
      this.dataStored.dataSaveDays = res.data.dataSaveDays;
      this.bigData.chartsType = res.data.chartsType;
      this.project.projectName = res.data.projectName;
      this.project.isForShow = res.data.isForShow;
    });
  },
  methods: {
    checkDays(rule, value, callback) {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error(this.$t("PLEASE_INPUT_A_POSITIVE_INTEGER")));
      } else if (Number(value) < 1) {
        return callback(new Error(THIS.$t('THE_DATABASE_STORAGE')));
      } else {
        return callback();
      }
    },
    exportTemplate() {
      this.download(
        "/robotPoint/exportPoint",
        {},
        `输出信息_${new Date().getTime()}.xlsx`
      ).then((res) => {
        this.download(res.msg);
      });
    },
    dataImport() {
      let file;
      var openSelectFile = document.createElement("input");
      openSelectFile.type = "file";
      openSelectFile.click();
      openSelectFile.onchange = (e) => {
        file = e.target.files[0];
        this.$warnMag(`${this.$t("WHETHER_TO_INPUT")}？`)
          .then((res) => {
            let formData = new FormData();
            formData.append("file", file);
            formData.append("areaId", this.areaId);
            return this.importData(formData);
          })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(this.$t("INPORTED_SUCCESS"));
              this.getList();
              done();
            } else {
              this.$message.error(res.msg);
            }
          });
      };
      openSelectFile.remove();
    },
    checkAge(rule, value, callback) {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error(this.$t("PLEASE_INPUT_A_POSITIVE_INTEGER")));
      } else {
        return callback();
      }
    },
    numberRule(rule, value, callback) {
      if (!Number(value)) {
        return callback(new Error(this.$t("PLEASE_INPUT_A_VALUE")));
      } else {
        return callback();
      }
    },importData(data) {
      return request({
        url: '/robotPoint/importPoint',
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
    },
    submit(name) {
      if (name === "threshold") {
        this.$refs[name].validate((flag) => {
          if (flag) {
            editConfig(this[name]).then((res) => {
              this.$message.success(this.$t("SAVE_SUCCESSFULLY"));
            });
          }
        });
      } else {
        if (name == "dataStored" && !this.dataStored.dataSaveDays) {
          this.dataStored.dataSaveDays = 180;
        }
        editConfig(this[name]).then((res) => {
          this.$message.success(this.$t("SAVE_SUCCESSFULLY"));
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.system-set {
  background: #eee;
}

.el-input {
  width: 220px;
  padding-right: 10px;
}

.title {
  font-size: 22px;
  font-weight: 700;
  padding: 20px;
}

.border {
  padding: 20px;
  background: #fff;
  margin-bottom: 10px;
}

.container {
  padding-top: 10px;
}

.button {
  text-align: center;
  padding: 30px 0;
}
</style>
