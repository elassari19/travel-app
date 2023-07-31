#include "main.h"
#include <stdio.h>
#include <stdlib.h>

/**
 * read_textfile - readtext
 *
 * @filename: file name
 * @letters: letters
 *
 * Return: number
*/

ssize_t read_textfile(const char *filename, size_t letters)
{

char *bufferStr;
ssize_t _file, _read, _writh;

_file = open(filename, O_RDONLY);
if (_file == -1)
return (0);

bufferStr = malloc(sizeof(char) * letters);
_read = read(_file, bufferStr, letters);
_writh = write(STDOUT_FILENO, bufferStr, _read);

free(bufferStr);
close(_file);
return (_writh);

}
