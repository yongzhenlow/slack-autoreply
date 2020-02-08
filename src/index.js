import 'dotenv/config';
import { WebClient } from '@slack/web-api';
import { RTMClient } from '@slack/rtm-api';
import messages from './messages.js';

const token = process.env.SLACK_LEGACY_TOKEN;

// Create a RTM API client using the access token
const rtm = new RTMClient(token);

// Create a Slack Web API client using the access token
const web = new WebClient(token);

// Store our last sent timestamp
const tsStore = {};

// Interval (s)
const interval = 28800; // 12 hours

// Attach listeners to events by type. See: https://api.slack.com/events/message
rtm.on('message', async (event) => {
    const myself = await web.auth.test();

    const { user, channel, subtype } = event;

    // Ignore messages from ourselves
    if (!user || user === myself.user_id) {
        return;
    }

    // DMs and not bot message
    if (channel.indexOf('D') === 0 && (!subtype || subtype !== 'bot_message')) {
        try {
            const lastTs = tsStore[user] || 0;

            if ((Date.now() / 1000) - lastTs > interval) {
                // Use "blocks" obj key if you want to send blocks, instead of "text"
                await web.chat.postEphemeral({ channel, user, text: messages.default, as_user: true });
                console.log(`message sent to ${user}`);

                tsStore[user] = Date.now() / 1000;
            }
        } catch (error) {
            console.log(`error while sending: ${error}`);
        }
    }
});

(async () => {
    await rtm.start();
    console.log('🚀 slack rtm started');
})();