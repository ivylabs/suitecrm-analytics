var bootstrapPanelComponent = BaseComponent.extend({
	update : function() {
		
		var myself = this;	
		var ph = $("#" + this.htmlObject);
		var panelHTML = "";
		
		var headerText = this.headerText || "";
		var footerText = this.footerText || "";
			
		panelHTML += '<div class="panel '+myself.panelType+'">';
		
		if(myself.showHeader){
			panelHTML += '<div class="panel-heading" id="'+myself.htmlObject+'_HEADER_ID">'+headerText+'</div>';
		}
		
		panelHTML += '<div  id="'+myself.htmlObject+'_INNER_ID" class="panel-body" style="height:'+myself.innerHeight+'px;">';
		
		if(this.innerHTML != null){
			panelHTML += myself.innerHTML;
		}
		
		panelHTML += '</div>';
		
		if(myself.showFooter){
			panelHTML += '<div class="panel-footer" id="'+myself.htmlObject+'_FOOTER_ID"">'+footerText+'</div>';
		}
		
		panelHTML += '</div>';
		
		ph.html(panelHTML);
	}
}); 