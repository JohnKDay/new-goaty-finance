/**
 * test.c
 * Small Hello World! example
 * to compile with gcc, run the following command
 * gcc -o test test.c -lulfius
 */
#include <stdio.h>
#include <ulfius.h>
#include <libpq-fe.h>
//#include "xlsxwriter.h"

#define PORT 8080

void do_exit(PGconn *conn) {
    
    PQfinish(conn);
    exit(1);
}

/**
 * Callback function for the web application on /getstocks url call
 */
int callback_getstocks (const struct _u_request * request, struct _u_response * response, void * user_data) {
  printf("in getstocks");
  PGconn *conn = PQconnectdb("host=postgresql-demo user=postgres password=gRAHBwPjR8 dbname=stocksdb");

  if (PQstatus(conn) == CONNECTION_BAD) {

      fprintf(stderr, "Connection to database failed: %s\n",
            PQerrorMessage(conn));
        do_exit(conn);
  }

  char *user = PQuser(conn);
  char *db_name = PQdb(conn);
  char *pswd = PQpass(conn);

  printf("User: %s\n", user);
  printf("Database name: %s\n", db_name);
  printf("Password: %s\n", pswd);

  PGresult *res = PQexec(conn, "SELECT ticker FROM stocks");

  if (PQresultStatus(res) != PGRES_TUPLES_OK) {

      printf("No data retrieved\n");
      PQclear(res);
      do_exit(conn);
  }

  printf("%s\n", PQgetvalue(res, 0, 0));
  ulfius_set_string_body_response(response, 200, PQgetvalue(res, 0, 0));

  PQclear(res);

  PQfinish(conn);
  return U_CALLBACK_CONTINUE;
}


/**
 * main function
 */
int main(void) {
  struct _u_instance instance;

  // Initialize instance with the port number
  if (ulfius_init_instance(&instance, PORT, NULL, NULL) != U_OK) {
    fprintf(stderr, "Error ulfius_init_instance, abort\n");
    return(1);
  }

  // Endpoint list declaration
  ulfius_add_endpoint_by_val(&instance, "GET", "/getstocks", NULL, 0, &callback_getstocks, NULL);

  // Start the framework
  if (ulfius_start_framework(&instance) == U_OK) {
    printf("Start framework on port %d\n", instance.port);

    while(1)
      getchar();
  } else {
    fprintf(stderr, "Error starting framework\n");
  }
  printf("End framework\n");

  ulfius_stop_framework(&instance);
  ulfius_clean_instance(&instance);

  return 0;
}
