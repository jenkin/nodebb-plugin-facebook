(function(module) {
    "use strict";

    var FacebookEmbed = {},
		embed = [
			{
				rgxp: /<a href="(?:https?:\/\/)?(?:www\.)?(?:facebook\.com)\/(.+)?(?:\/posts\/)(.+?)".+<\/a>/ig,
				mbdc: '<p class="fb-post" data-href="https://www.facebook.com/$1/posts/$2" data-width="395"></p>'
			},
			{
				rgxp: /<a href="(?:https?:\/\/)?(?:www\.)?(?:facebook\.com)\/permalink\.php\?story_fbid=(.+?)\&(?:amp;)?id=(.+?)".+<\/a>/ig,
				mbdc: '<p class="fb-post" data-href="https://www.facebook.com/permalink.php?story_fbid=$1&id=$2" data-width="395"></p>'
			}
		];
	
	FacebookEmbed.parse = function(data, callback) {
        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }
		for (var i=0; i<embed.length; i++) {
	        if (data.postData.content.match(embed[i].rgxp)) {
    	        data.postData.content = data.postData.content.replace(embed[i].rgxp, embed[i].mbdc);
        	}
		}
        callback(null, data);
    };

    module.exports = FacebookEmbed;

}(module));
