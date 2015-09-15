/* 
*  This control extends the standard sap.ui.unified.Calendar control, but adds event monthChanged.
*  Event monthChanged is fired when the user moves focus to a different month.
*  This event allows for lazy loading of special days.
*/

sap.ui.define(["sap/ui/unified/Calendar"],

function (Calendar) {
	"use strict";

	return Calendar.extend("com.penninkhof.controls.Calendar", {
		
		metadata : {
			events : {
				monthChanged : {
					parameters : {
						year : {type : "int"},
						month : {type : "int"}
					}
				}
			}
		},
		
		init : function () {
			Calendar.prototype.init.call(this);
			var months = this.getAggregation("month");
			for (var i = 0; i < months.length; i++) {
				var month = months[i];
				month.attachEvent("_renderMonth", this._handleRenderMonth, this);
			}
		},

		_handleRenderMonth: function() {
			var month = this.getAggregation("month")[0];
			this.fireEvent(
				"monthChanged", 
				{ 
					year: month.getDate().getMonth(), 
					month: month.getDate().getFullYear()
				});
		},
		
		renderer: {}
		
	});

});