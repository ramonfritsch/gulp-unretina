var gm = require("gm");
var through = require("through2");
var _ = require("lodash");

module.exports = function imageResizer(options) {
	options = _.defaults(options || {}, {
		overwrite : true,
		quality : 1,
		suffix: "@2x"
	});

	var _gm = gm;

	return through.obj(function (file, enc, done) {
		if (file.isNull())
		{
			return done(null, file);
		}

		if (file.isStream())
		{
			return done(new PluginError(PLUGIN_NAME, "Streaming not supported"));
		}

		var gmFile = _gm(file.contents, file.path);

		gmFile.size(function (err, size) {
			if (err)
			{
				return done(new PluginError(PLUGIN_NAME, err));
			}
			else
			{
				gmFile.resize(Math.ceil(size.width / 2), Math.ceil(size.height / 2));

				if (options.quality !== 1)
				{
					gmFile = gmFile.quality(Math.floor(options.quality * 100));
				}

				gmFile.toBuffer(function (err, buffer) {
					if (err)
					{
						return done(new PluginError(PLUGIN_NAME, err));
					}
					else
					{
						file.path = file.path.replace(options.suffix + ".", ".");
						file.contents = buffer;

						done(null, file);
					}
				});
			}
		});
	});
};