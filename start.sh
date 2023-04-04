#!/bin/bash

if [ "$SYSTEM_CODE" == 'PrdU1' ]; then
    if [ ! -z "$PRE_TEST2_DNSEndpoint" ]; then
        CBT_URL="https://pre-test2.buntst.com"
        HOST="pre-test2.buntst.com"
    else
        CBT_URL="https://webu1.buntst.com"
        HOST="webu1.buntst.com"
    fi
elif [ "$SYSTEM_CODE" == 'PrdK1' ]; then
    if [ ! -z "$PRE_TEST2_DNSEndpoint" ]; then
        CBT_URL="https://pre-test2.buntst.com"
        HOST="pre-test2b.buntst.com"
    else
        CBT_URL="https://webk1.buntst.com"
        HOST="webk1.buntst.com"
    fi
fi

if [ ! -z "$HOST" ]; then
    echo "var HOST = '${HOST}';
    var BASE_DOMAIN = HOST.split('.').slice(1).join('.');
    var BASE_URL = 'https://' + HOST;

    window.env= {};
    window.env.REACT_APP_BASE_DOMAIN=BASE_DOMAIN;
    window.env.REACT_APP_AUTH_API=BASE_URL+'/API/DAE';
    window.env.REACT_APP_DAE_API=BASE_URL+'/API/DAE';
    window.env.REACT_APP_DAE_API_MOCK=BASE_URL+'/.api/dae';
    window.env.REACT_APP_REC_API=BASE_URL+'/API/REC';
    window.env.REACT_APP_REC_MOCK_API=BASE_URL+'/.api/rec';
    window.env.REACT_APP_ADM_API=BASE_URL+'/API/ADM';
    window.env.REACT_APP_ADM_MOCK_API=BASE_URL+'/.api/adm';
    window.env.REACT_APP_MASTER_API=BASE_URL+'/API/MIM';
    window.env.REACT_APP_MASTER_MOCK_API=BASE_URL+'/.api/master';
    window.env.REACT_APP_USP_API=BASE_URL+'/API/USP/api/usp';
    window.env.REACT_APP_USP_MOCK_API=BASE_URL+'/.api/usp';
    window.env.REACT_APP_CHATBOT_API='${CBT_URL}'+'/API/CBT';
    window.env.REACT_APP_MIM_API=BASE_URL+'/API/MIM';" > /usr/local/apache2/htdocs/fe-app/env.js
fi

/usr/local/apache2/bin/httpd -D FOREGROUND