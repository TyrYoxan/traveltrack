import apiResponses from '../../utils/apiResponse.js';
import logger from '../../utils/logger.js';
import authService from '../service/auth.service.js';

async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    return apiResponses.erreur(res, 422,'Incomplete information: Email and password is required',null);
  }

  try{
    const connexion = await authService.login(req.body);

    return apiResponses.succes(res,200, connexion, 'Successfully logged in');
  }catch(err){
    return apiResponses.erreur(res,500, 'Error with data base', err.message);
  }

}

async function register(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(422, 'Incomplete information' ,'Email and password is required');
  }

  try{
    const connexion = await authService.register(req.body);
    return apiResponses.ok(res,200, connexion, 'Successfully logged in');
  }catch(err){
    return res.status(500, 'Error with data base', err.message);
  }

}

async function logout(req, res) {
  try{
    const connexion = await authService.logout(req.body);

    return res.status(200, connexion, 'Successfully logged in');
  }catch(err){
    return res.status(500, 'Error with data base', err.message);
  }

}

export default { login, register, logout };