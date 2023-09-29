# Use the Alpine Linux base image
FROM node:18.4.0-alpine

# Create a directory for your application and set it as the working directory
WORKDIR /app

# Mount a volume from the host to /app/data in the container
VOLUME /app/data

# Expose port 80
EXPOSE 80

# Start your application (replace this with your actual application command)
CMD ["/bin/sh"]