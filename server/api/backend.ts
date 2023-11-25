import { $fetch } from "ofetch";

export default eventHandler(async (event) => {
  const { files, fields } = event.context.formidable;
  const username = fields.username;
  const password = fields.password;


  console.log('Username:', username);
  console.log('Password:', password);
  console.log('Files:', files[0]);

  const body ={
    "username":username,
    "password":password,
    "file": files['file'],
  }
  console.log("body - ", body)

  const externalUrl  = process.env.EXTERNAL_URL;
  const secretISabel = process.env.SECRET_ISABEL;
  if(externalUrl && secretISabel){
  await $fetch( externalUrl , {
    method: 'POST',
    body: body,
    headers: {
      'Authorization': secretISabel,
      'Smovin-Account-Uuid': '8d92311e-65c8-4f06-a237-1be49b0ddab3'

    }
  });}
  else{
    console.error('API_URL or/and  SECRET_ISABEL is undefined');
  }


  return {
    ok: true,
  };
});
