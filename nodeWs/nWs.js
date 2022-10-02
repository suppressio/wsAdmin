
const http = require('http');

const host = 'localhost';
const port = 8080;

const requestListener = async function (req, res) {
    if (req.url === '/test') {
      await runFunctionAndResponse(res);
   /*   console.log("testResult",testResult); 

      let message = `{"testResult":${testResult}}`;
  
      console.log('Returning /test results');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(message);*/
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(`{"notImplemented"}`);
    }
};

async function runFunctionAndResponse(res){
    
    executeScripts(async (r)=>{ 
      let testResult = await r;
      let message = `{"testResult":"${testResult}"}`;;
  
      console.log('Returning /test results');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(message);
    });
}
  
function executeScripts (callback) {
    const exec = require('child_process').exec;

    const myShellScript = exec('sh /home/suppressio/Dev/wsAdmin/test.sh');

    var result;
    myShellScript.stdout.on('data', (data)=>{
            // console.log(data); 
            // do whatever you want here with data
            result = data;
        });

    myShellScript.stderr.on('data', (data)=>{
            console.error(data);
            result = data.stderr;
        });
    
    myShellScript.on('close', () => {
        return callback(result);
    });
    
    //myShellScript.on('error', (err) => { reject(err) });
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
console.log(`Server is running on http://${host}:${port}`);
});