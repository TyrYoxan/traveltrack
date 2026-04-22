const fs = require('fs');
const dotenv = require('dotenv');
const schema = require('./env.schema.js');

// ===== MAIN =====
const config = {};
const errors = [];

try {
  const envContent = fs.readFileSync('./.env', 'utf8');
  const envParsed = dotenv.parse(envContent);

  // Valider chaque clé du schéma
  for (const key of Object.keys(schema)) {
    const error = validateEnvVariable(key, envParsed, config);
    if (error) errors.push(error);
  }

  displayValidationReport(errors);

  // Bloquer le démarrage si erreurs
  if (errors.length > 0) {
    process.exit(1);
  }

} catch (err) {
  if (err instanceof Error) {
    console.error('❌ Erreur lors de la lecture du fichier .env:', err.message);
  }
  process.exit(1);
}

module.exports = config;

// ===== FUNCTIONS =====

function validateEnvVariable(key, envParsed, config) {
  const schemaKey = schema[key];

  if (!(key in envParsed)) {
    // Si obligatoire et pas de valeur par défaut → erreur
    if (schemaKey.obligation && !schemaKey.default) {
      return `${key} : Valeur obligatoire manquante`;
    }
    // Sinon, utiliser la valeur par défaut
    if (schemaKey.default !== undefined) {
      config[key] = schemaKey.default;
      return null;
    }
    return null;
  }

  const value = envParsed[key].trim();

  if (value.length === 0) {
    if (schemaKey.obligation) {
      return `${key} : Valeur vide non autorisée`;
    }
    if (schemaKey.default !== undefined) {
      config[key] = schemaKey.default;
      return null;
    }
    return null;
  }

  const typeError = validateType(key, value, schemaKey);
  if (typeError) return typeError;

  config[key] = schemaKey.type === 'number' ? parseInt(value, 10) : value;
  return null;
}

function validateType(key, value, schema) {
  if (schema.type === 'number') {
    if (isNaN(Number(value))) {
      return `${key} : Doit être un nombre, reçu "${value}"`;
    }
    const num = parseInt(value, 10);
    if (num < 0) {
      return `${key} : Doit être positif, reçu ${num}`;
    }
  }

  if (schema.type === 'enum') {
    if (!schema.values?.includes(value)) {
      return `${key} : Valeur invalide. Accepté: ${schema.values?.join(', ')}`;
    }
  }

  return null;
}

function displayValidationReport(errors) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 ENV FILE VALIDATION REPORT');
  console.log('='.repeat(60));

  if (errors.length === 0) {
    console.log('✅ Configuration valide - Aucune erreur détectée.');
  } else {
    console.log(`❌ ${errors.length} erreur(s) détectée(s):\n`);
    errors.forEach((error, index) => {
      console.log(`   ${String(index + 1).padStart(2, ' ')}. ${error}`);
    });
  }

  console.log('='.repeat(60) + '\n');
}