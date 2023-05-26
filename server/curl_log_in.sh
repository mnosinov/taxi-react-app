curl -X POST http://localhost:8000/api/log_in/ \
-H 'Content-Type: application/json' \
-d '
{
	"username": "another.user",
	"password": "test"
}
'

