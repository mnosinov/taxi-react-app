curl -X POST http://localhost:8000/api/sign_up/ \
-H 'Content-Type: application/json' \
-d '
{
	"username": "another.user",
	"password1": "test",
	"password2": "test",
	"first_name": "Another",
	"last_name": "User"
}
'

