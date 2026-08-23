<?php
/**
 * App profile — TMW family
 * コア（proxy / install / setup）はアプリ名を知らない。ここだけ差し替える。
 */
return [
    'id'       => 'tmw',
    'name'     => 'TMW family',
    'edition'  => 'Remote',
    'version'  => 'v1.0',
    'tagline'  => 'Guild community',
    'setup_hint' => '管理画面の「外部ストレージ」で接続確認すると、ここに ping が残ります。',
    'namespace_prefix' => 'tmw',
    'settings_key' => 'settings.latest',
    'cors' => [
        'https://tmw.pachimanzi.uk',
        'http://localhost:8080',
        'http://127.0.0.1:8080',
    ],
];
