#include "main.h"

/**
 * create_file - creat file
 * @filename: file name
 * @text_content: text
 *
 * Return: number
 */
int create_file(const char *filename, char *text_content)
{
int file, _write, bufferlength = 0;

if (filename == NULL)
return (-1);

if (text_content != NULL)
{
for (bufferlength = 0; text_content[bufferlength];)
bufferlength++;
}

file = open(filename, O_CREAT | O_RDWR | O_TRUNC, 0600);
_write = write(file, text_content, bufferlength);

if (file == -1 || _write == -1)
return (-1);
close(file);
return (1);
}
