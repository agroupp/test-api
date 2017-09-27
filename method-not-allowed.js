/**
 * Method Not Allowed function
 * Sends 405 HTTP Status
 */
module.exports = (req, res) => res.sendStatus(405);