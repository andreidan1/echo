import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MEMORY_FILE = join(__dirname, 'memory.json');

/**
 * Load conversation history from JSON file
 * @returns {Promise<Array>} Array of message objects
 */
export async function loadMemory() {
  try {
    const data = await fs.readFile(MEMORY_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist yet, return empty array
      return [];
    }
    console.error('Error loading memory:', error);
    return [];
  }
}

/**
 * Save conversation history to JSON file
 * @param {Array} messages - Array of message objects
 * @returns {Promise<void>}
 */
export async function saveMemory(messages) {
  try {
    await fs.writeFile(MEMORY_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving memory:', error);
  }
}

/**
 * Add a single message to memory
 * @param {Array} currentMemory - Current memory array
 * @param {string} sender - 'user' or 'ai'
 * @param {string} text - Message text
 * @returns {Array} Updated memory array
 */
export function addToMemory(currentMemory, sender, text) {
  const message = {
    sender,
    text,
    timestamp: new Date().toISOString(),
  };
  return [...currentMemory, message];
}

/**
 * Get recent memory for context (last N messages)
 * @param {Array} memory - Full memory array
 * @param {number} count - Number of recent messages to return
 * @returns {Array} Recent messages
 */
export function getRecentMemory(memory, count = 10) {
  return memory.slice(-count);
}

/**
 * Clear all memory
 * @returns {Promise<void>}
 */
export async function clearMemory() {
  try {
    await fs.writeFile(MEMORY_FILE, JSON.stringify([], null, 2), 'utf-8');
  } catch (error) {
    console.error('Error clearing memory:', error);
  }
}
