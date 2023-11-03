FROM public.ecr.aws/amazonlinux/amazonlinux:2023 

#Install Python
RUN dnf install -y python3.11 && \ 
    dnf install -y python3.11-pip && \
    dnf install -y zip && \
    dnf clean all

#Set up PIP and Venv
RUN python3.11 -m pip install --upgrade pip && \
    python3.11 -m pip install virtualenv
RUN python3.11 -m venv base
RUN source base/bin/activate

#install dependencies
COPY ./requirements.txt .
RUN pip install \
--platform manylinux2014_x86_64 \
--target=package \
--implementation cp \
--python-version 3.11 \
--only-binary=:all: --upgrade \
-r requirements.txt -t ./python

#zip it up for deployment
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash"]