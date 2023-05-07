import * as tmi from 'tmi.js';
import * as robot from 'robotjs';
import { channelName, botUsername, oauthKey } from './config.json';
import { boostKey, boostDuration, breakKey, breakDuration, pauseKey, pauseDuration } from './mapping.json';

/** Creating a TMI client instance */
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: [channelName],
    identity: {
        username: botUsername,
        password: oauthKey
    }
});

/** Establishing a connection to the Twitch channel */
client.connect();

/** Listening to messages sent in the Twitch channel */
client.on('message', (channel, tags, message, self) => {
    if (message === '!boost' || (tags.bits && tags.bits >= 10 && message.toLowerCase().includes('boost'))) performKeyAction(boostKey, boostDuration);
    else if (message === '!break' || (tags.bits && tags.bits >= 10 && message.toLowerCase().includes('break'))) performKeyAction(breakKey, breakDuration);
    else if (message === '!pause' || (tags.bits && tags.bits >= 10 && message.toLowerCase().includes('pause'))) performKeyAction(pauseKey, pauseDuration);
});

/**
* A function to perform key actions using the RobotJS library
* @param key The key to toggle
* @param duration The duration to hold the key down (in milliseconds)
*/
function performKeyAction(key: string, duration: number): void {
    robot.keyToggle(key, 'down');
    setTimeout(() => robot.keyToggle(key, 'up'), duration);
}