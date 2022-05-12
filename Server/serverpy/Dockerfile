# 
FROM python:3.9

# 
WORKDIR /usr/src/app

# 
COPY ./req.txt .

# 
RUN apt-get update && apt-get install -y python3-opencv
RUN pip install --no-cache-dir --upgrade -r req.txt

# 
COPY . .

# 
CMD ["uvicorn", "main:app", "--proxy-headers", "--forwarded-allow-ips='*'", "--host", "0.0.0.0", "--port", "8000"]
