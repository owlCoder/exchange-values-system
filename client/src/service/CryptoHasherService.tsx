/**
 * Hashes a password using SHA-256 algorithm.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A Promise resolving to the hashed password as a hexadecimal string.
 */
export async function hashPassword(password: string): Promise<string> {
    // Convert password string to UTF-8 encoded bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // Generate hash using SHA-256 algorithm
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert hashed buffer to an array of bytes
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // Convert bytes to a hexadecimal string
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashedPassword;
  }
  