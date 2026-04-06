$headers = @{
  "Authorization" = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUwOTY1NGFlOGE1YWU0NTk2NzhjZSIsImlhdCI6MTc3NTQ2OTE0NiwiZXhwIjoxNzc2MzMzMTQ2fQ.hN-8Uv4SBCClTxuXTzuI6nj9Vi9fXU4v22nGDbI2wwzfQ"
}

$multipartContent = [System.Net.Http.MultipartFormDataContent]::new()
$multipartContent.Add([System.Net.Http.StringContent]::new("Test Category"), "name")
$multipartContent.Add([System.Net.Http.StringContent]::new("Test Description"), "description")

$fileStream = [System.IO.File]::OpenRead("public/img/favicon.png")
$fileContent = [System.Net.Http.StreamContent]::new($fileStream)
$multipartContent.Add($fileContent, "imageCover", "favicon.png")

$client = [System.Net.Http.HttpClient]::new()
foreach ($h in $headers.GetEnumerator()) { $client.DefaultRequestHeaders.Add($h.Key, $h.Value) }

try {
  $response = $client.PostAsync("http://localhost:8000/api/v1/catagories", $multipartContent).Result
  $content = $response.Content.ReadAsStringAsync().Result
  Write-Host "Status: " $response.StatusCode
  Write-Host "Response: " $content
} finally {
  $fileStream.Close()
  $client.Dispose()
}
