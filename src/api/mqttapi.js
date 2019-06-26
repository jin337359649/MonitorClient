import request from '@/utils/request'

export function GetList(){
    return request({
        url: '/api/MqttClient/GetList',
        method: 'get',
      })
}

export function Reset(params){
    return request({
        url: '/api/MqttClient/Reset',
        method: 'get',
        params: params
      })
}

export function SetCode(params){
    return request({
        url: '/api/MqttClient/SetCode',
        method: 'get',
        params: params
      })
}

export function GetCode(){
    return request({
        url: '/api/MqttClient/GetCode',
        method: 'get',
      })
}

export function GetDescription(){
    return request({
        url: '/api/MqttClient/GetDescription',
        method: 'get',
      })
}