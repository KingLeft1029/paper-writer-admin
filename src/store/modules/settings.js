/*
 * @Author: mikeShn
 * @Date: 2022-04-22 20:47:48
 * @LastEditTime: 2022-04-24 09:58:44
 * @FilePath: \digital-earth-PC\src\store\modules\settings.js
 * @Description: 文件说明
 */
import defaultSettings from '@/settings'

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const state = {
    title: '',
    theme: storageSetting.theme || '#147AF2',
    sideTheme: storageSetting.sideTheme || sideTheme,
    showSettings: showSettings,
    topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
    tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
    fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
    sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
    dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
    activeTextColor: '#6CFFF5'
}
const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    // 修改布局设置
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
    // 设置网页标题
    setTitle({ commit }, title) {
        state.title = title
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

