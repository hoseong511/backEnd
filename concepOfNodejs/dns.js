'use strict'

const dns = require('dns');

dns.lookup('test.com', (err, address1, family) => {
  console.log(`address: ${address1}, ${family}`);
  //                        주소 , ipv 4? 6
})

dns.resolve4('archive.org', (err, addresses) => {
  if (err) throw err

  const res = JSON.stringify(addresses)
  console.log(res);

  addresses.forEach(a => {
    dns.reverse(a, (err, hostnames) => {
      if (err) throw err

      console.log(`reverse for ${a}; ${JSON.stringify(hostnames)}`);
    })
  })

})