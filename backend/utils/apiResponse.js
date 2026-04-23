/** Retourne une reponse correct
 *
 * @param res
 * @param {number}status
 * @param {Object}data
 * @param {string}description
 * @returns {{success: boolean, status: *, desc: *, body: string}}
 */
function succes(res, status, data, description){
    return res.json( {
        success: true,
        status: status || 200,
        desc: description || "",
        body: data || null,
        errors: null
    });
}

/** Retourne une reponse error
 *
 * @param res
 * @param {number}status
 * @param {string}description
 * @param {Object}err
 * @returns {{success: boolean, status, desc, body: null, errors: *}}
 */
function erreur(res, status, description, err){
    return res.json( {
        success: false,
        status: status || 200,
        desc: description || "",
        body: null,
        errors: err || null,
    });
}

export default {succes, erreur};