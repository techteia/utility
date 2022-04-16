'use strict';

const createDatetimeFromString = (datetimeString) => {
  const millisecond = 1;
  const second = 1000 * millisecond;
  let datetime;
  if (datetimeString) {
    datetime = new Date();
    datetime.setTime(Number(datetimeString * (1 * second)));
  }
  return datetime;
};

// Decodes base64 strings to ASCII
const decodeBase64 = (data, encoding = 'base64', radix = 'utf-8') => {
  // const buff = Buffer.from(data, encoding);
  // return buff.toString(radix);
  return Buffer.from(data, encoding).toString(radix);
};

// Encodes strings to base64
const encodeBase64 = (data, encoding = 'base64') => {
  // const buff = Buffer.from(data);
  // return buff.toString(encoding);
  return Buffer.from(data).toString(encoding);
};

// Current datetime in following format (string) YYYY-MM-DD HH:MM:SS
const getCondensedDatetimeString = (_datetime = new Date()) => {
  const _year = _datetime.getFullYear();
  const _month = zeroPadInteger(_datetime.getMonth() + 1, 2);
  const _date = zeroPadInteger(_datetime.getDate(), 2);
  const _hours = zeroPadInteger(_datetime.getHours(), 2);
  const _minutes = zeroPadInteger(_datetime.getMinutes(), 2);
  const _seconds = zeroPadInteger(_datetime.getSeconds(), 2);

  return (`${_year}${_month}${_date}${_hours}${_minutes}${_seconds}`);
};

// Current datetime in following format (string) YYYY-MM-DD HH:MM:SS
const getFormattedDatetimeString = (datetime = new Date()) => {
  const year = datetime.getFullYear();
  const month = zeroPadInteger(datetime.getMonth(), 2);
  const date = zeroPadInteger(datetime.getDate(), 2);

  const hours = zeroPadInteger(datetime.getHours(), 2);
  const minutes = zeroPadInteger(datetime.getMinutes(), 2);
  const seconds = zeroPadInteger(datetime.getSeconds(), 2);

  return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
};

const inspect = (
  object,
  options = {
    showHidden: false,
    depth: null
  }
) => {
  console.debug(
    require('util').inspect(
      object,
      options
    )
  );
};

const log = (...args) => {
  console.info(`[${getFormattedDatetimeString()}] ${args.reduce((accumulator, value) => `${accumulator} ${value}`)}`);
};

const normalizePort = (val) => {
  const port = parseInt(
    val,
    10
  );

  // named pipe
  if (isNaN(port))
    return val;

  // port number
  if (port >= 0)
    return port;

  return false;
};

// Performs a url encoding to a javascript object
const urlEncode = (o) => Object.keys(o).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(o[k])}`).join('&');

// Appends 0's to a number and returns as a string
const zeroPadInteger = (integer, fieldWidth) => {
  integer = integer + '';
  return integer.length >= fieldWidth ? integer : new Array(fieldWidth - integer.length + 1).join('0') + integer;
};

module.exports = {
  createDatetimeFromString,
  decodeBase64,
  encodeBase64,
  getCondensedDatetimeString,
  getFormattedDatetimeString,
  inspect,
  log,
  normalizePort,
  urlEncode,
  zeroPadInteger,
};
