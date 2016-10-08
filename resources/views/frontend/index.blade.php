<!doctype html>
<html ng-app="angularSeedApp">
<head>
    <meta charset="utf-8">
    <title>Angular Seed APP</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('styles/frontend/vendor.css') }}">
    <link rel="stylesheet" href="{{ asset('styles/frontend/app.css') }}">
</head>
<body><!--[if lt IE 10]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->
<div ui-view=""></div>
<script src="{{ asset('scripts/frontend/vendor.js') }}"></script>
<script src="{{ asset('scripts/frontend/app.js') }}"></script>
</body>
</html>