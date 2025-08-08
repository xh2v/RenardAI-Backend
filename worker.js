export async function fetch(request, env) {
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  if (request.method === 'POST') {
    const origin = request.headers.get('Origin');
    const allowedOrigin = origin ?? '*';
    const headers = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Content-Type': 'application/json',
    };

    try {
      const { message, model } = await request.json();

      if (!message) {
        return new Response(JSON.stringify({ error: 'Message is required' }), {
          status: 400,
          headers,
        });
      }

      const backendURL = env.RENDER_BACKEND_URL;

      if (!backendURL) {
        return new Response(JSON.stringify({ error: 'RENDER_BACKEND_URL is not set in env vars' }), {
          status: 500,
          headers,
        });
      }

      const response = await fetch(`${backendURL}/inference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: message,
          model: model || 'mistralai/Mistral-7B-Instruct-v0.2'
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return new Response(JSON.stringify({ error }), {
          status: response.status,
          headers,
        });
      }

      const data = await response.json();

      return new Response(JSON.stringify({ response: data.response }), {
        status: 200,
        headers,
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers,
      });
    }
  }

  return new Response('Method Not Allowed', { status: 405 });
}

function handleOptions(request) {
  const headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    const origin = headers.get('Origin');
    const responseHeaders = {
      'Access-Control-Allow-Origin': origin ?? '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };
    return new Response(null, {
      status: 204,
      headers: responseHeaders,
    });
  } else {
    return new Response(null, {
      status: 403,
      statusText: 'Forbidden',
    });
  }
}

