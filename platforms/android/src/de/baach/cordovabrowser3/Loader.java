package de.baach.cordovabrowser3;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.widget.Toast;

/**
 * This class echoes a string called from JavaScript.
 */
public class Loader extends CordovaPlugin {

	/**
	 * Executes the request and returns PluginResult.
	 *
	 * @param action        The action to execute.
	 * @param args          JSONArry of arguments for the plugin.
	 * @param callbackId    The callback id used when calling back into JavaScript.
	 * @return              A PluginResult object with a status and message.
	 */
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		try {
			if (action.equals("load")) {
				String url = args.getString(0);
				this.webView.loadUrl(url);
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
                return true;
			} else {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
                return false;
			}
		} catch (JSONException e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
            return false;
		}
	}
}
