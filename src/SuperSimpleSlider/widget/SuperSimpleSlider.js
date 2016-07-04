/*global logger*/
/*
    SuperSimpleSlider
    ========================

    @file      : SuperSimpleSlider.js
    @version   : 1.0.0
    @author    : Paul Ketelaars
    @date      : 2016-07-01
    @copyright : Timeseries Consulting 2016
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "dojo/dom-attr",

    "SuperSimpleSlider/lib/jquery-1.11.2",
    "SuperSimpleSlider/lib/sss/sss",
    "dojo/text!SuperSimpleSlider/widget/template/SuperSimpleSlider.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, domAttr, _jQuery, sss, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget's prototype.
    return declare("SuperSimpleSlider.widget.SuperSimpleSlider", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
       templateString: widgetTemplate,

        // DOM elements
        _sliderNode: null,

        // Parameters configured in the Modeler.
        entity: "",
        entityConstraint: "",
        captionattr: "",
        imageattr: "",
        sliderType: "",
        sortattr: "",


        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,


        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            logger.level(logger.DEBUG);
            logger.debug(this.id + ".constructor");
            this._handles = [];

        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            logger.debug(this.id + ".postCreate");

         //   this._updateRendering();
            this._setupEvents();

        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._getData();
          //  this._resetSubscriptions();
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {
          logger.debug(this.id + ".enable");
        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {
          logger.debug(this.id + ".disable");
        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {
          logger.debug(this.id + ".resize");
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        // We want to stop events on a mobile device

        // Attach events to HTML dom elements
        _setupEvents: function () {
            logger.debug(this.id + "._setupEvents");
            

        },

        // // Rerender the interface.
        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");
            
            if (this._contextObj !== null) {
                
            } else {
            }

            // Important to clear all validations!
            this._clearValidations();

            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            mendix.lang.nullExec(callback);
        },

        // Handle validations.
        _handleValidation: function (validations) {
            logger.debug(this.id + "._handleValidation");
            this._clearValidations();

        },

        // Clear validations.
        _clearValidations: function () {
            logger.debug(this.id + "._clearValidations");
        },

        // Show an error message.
        _showError: function (message) {
            logger.debug(this.id + "._showError");
        },

        // Add a validation.
        _addValidation: function (message) {
            logger.debug(this.id + "._addValidation");
            this._showError(message);
        },

        _unsubscribe: function () {
          if (this._handles) {
              dojoArray.forEach(this._handles, function (handle) {
                  mx.data.unsubscribe(handle);
              });
              this._handles = [];
          }
        },


        _getData: function () {
            var self = this;
       var xpathString = "//" + this.entity + this.entityConstraint;

        mx.data.get({
            xpath : xpathString,
            filter : {
                sort    : [[this.sortattr, "asc"]],
            },
            callback : function(mxObjs) {
                    //use self instead of this - dojo hitch will screw up the scope of the render function
                self.mxObjects = mxObjs;
                self._render(mxObjs);
            },

                error: dojo.hitch(this, function(err) {
                    logger.warn("Unable to retrieve data for xpath '" + xpath + "': " + err, err);
                })
        });          

        },

        _render: function(mxObjs) {

            var htmlString = "";
            for(var i = 0; i < mxObjs.length; i++) {
                var object = mxObjs[i];
                var url =  object.get(this.imageattr);
                var type = object.get(this.sliderType)
                if(type == 'image') {
                    htmlString += '<img src='+url+ ' />'
                } else if (type == 'video') {
                    htmlString += '<video src='+url+ ' />' 

                } else if (type == 'audio') {
                    htmlString += '<audio src='+url+ ' />'

                } else
                logger.warn(this.id + "Invalid slidertype " + this.sliderType);
            }

            logger.debug(htmlString);

           domAttr.set(this._sliderNode, "innerHTML", htmlString);
           $('.slider').sss();
            }

    });
});

require(["SuperSimpleSlider/widget/SuperSimpleSlider"]);
