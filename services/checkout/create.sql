drop table if exists microservices_order;
drop table if exists microservices_course;

create table microservices_course (
    course_id uuid,
    title text,
    amount numeric 
);

create table microservices_order (
    order_id uuid,
    course_id uuid,
    name text,
    email text,
    status text,
    amount numeric
);

insert into microservices_course values ('83e88f3a-49a5-43e0-a07a-8dd9e64c0915', 'Microservice with Clean Arch', 1199);
