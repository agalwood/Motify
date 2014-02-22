/* global $ */
;(function($, window, document, undefined) {

    'use strict';

    var pluginName = 'Motify',
        defaults = {
            wrapperTpl: '<div class=\"motify\">' +
                '<div class=\"motify-inner\">' +
                '</div>' +
                '</div>',
            contentTpl: '<p><%=content %><p>',
            duration: 2000
        };

    function Plugin(options) {

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var self = this;

            if ($('.motify').length) {
                self.$el = $('.motify');
            } else {
                self.$el = $(self.settings.wrapperTpl);
                $('body').append(self.$el);
            }
        },

        setConfig: function(options) {
            var self = this;

            self.settings = $.extend({}, self.settings, options);
        },

        /**
         * log: motify 消息提示
         * @param  {string} msg      提示的内容
         * @param  {number} duration 提示框存在的时间；
         *                           为『0』则提示框不会消失，需要手动调用clear方法关闭。
         */
        log: function(msg, duration) {
            var self = this;

            // 清除现有提示信息
            self.clear();

            // 显示信息
            self.show(msg);

            // 自动隐藏
            self.hide(duration);
        },

        /**
         * show: motify 显示消息
         * @param  {string} msg 提示消息
         */
        show: function(msg) {
            var self = this;

            self.$el.find('.motify-inner').html(msg);
            self.$el.show();
        },

        /**
         * hide: motify 自动隐藏
         * @param  {number} duration 提示框自动隐藏时间
         */
        hide: function(duration) {
            var self = this;

            var _duration = self.settings.duration;
            if (typeof duration === 'number') {
                _duration = duration;
            }

            // 计时器大于 0，提示条才自动隐藏
            if (_duration > 0) {
                window.setTimeout(function() {
                    self.$el.addClass('motifyFx');
                    self.timer = window.setTimeout(function() {
                        self._hide();
                    }, 300);
                }, _duration);
            }
        },

        _hide: function() {
            var self = this;

            self.$el.hide().removeClass('motifyFx');
        },

        /**
         * clear 清除motify提示框
         */
        clear: function() {
            var self = this;

            self._hide();

            // 清除动画计时器
            window.clearTimeout(self.timer);
            self.timer = null;
        }

    };

    // 注册motify到全局
    window.motify = window.motify || new Plugin();

})($, window, document);
