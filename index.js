addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    const parsedUrl = new URL(request.url)
    const pathname = parsedUrl.pathname
    const path = normalize_path(pathname)
    const contentType = determine_content_type(path)
    const key = path.startsWith("/") ? path.slice(1) : path
    const body = await STATIC_CONTENT.get(key)

    const res = new Response(body, { status: 200 })
    res.headers.set("Content-type", contentType)
    return res
  } catch (err) {
    console.log(err)
    let res = new Response(err.body, { status: err.status })
    res.headers.set("Content-type", "text/html")
    return res
  }
}

const normalize_path = path => (path.endsWith("/") ? path + "index.html" : path)

function determine_content_type(path) {
  if (path.endsWith("html")) {
    return "text/html"
  } else if (path.endsWith("css")) {
    return "text/css"
  } else if (path.endsWith("ttf")) {
    return "application/font-sfnt"
  } else if (path.endsWith("yml")) {
    return "text/yaml"
  } else if (path.endsWith("eot")) {
    return "application/vnd.ms-fontobject"
  } else if (path.endsWith("json")) {
    return "application/json"
  } else if (path.endsWith("md")) {
    return "text/markdown"
  } else if (path.endsWith("webm")) {
    return "video/webm"
  } else if (path.endsWith("otf")) {
    return "application/font-sfnt"
  } else if (path.endsWith("js")) {
    return "text/javascript"
  } else if (path.endsWith("xml")) {
    return "text/xml"
  } else if (path.endsWith("svg")) {
    return "image/svg+xml"
  } else if (path.endsWith("scss")) {
    return "text/x-sass"
  } else if (path.endsWith("woff")) {
    return "application/font-woff"
  } else if (path.endsWith("woff2")) {
    return "font/woff2"
  } else if (path.endsWith("png")) {
    return "image/png"
  } else if (path.endsWith("jpg")) {
    return "image/jpeg"
  } else if (path.endsWith("mp4")) {
    return "video/mp4"
  } else if (path.endsWith("gif")) {
    return "image/gif"
  } else {
    return "text/plain"
  }
}
