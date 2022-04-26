package org.example;

import java.util.concurrent.TimeUnit;

/**
 * Hello world!
 *
 */
public class App 
{
    public static Object Lock1 = new Object();
    public static Object Lock2 = new Object();

    public static void main( String[] args ) throws InterruptedException {
        // RUNNABLE
        Thread hamburger = new Thread(new Hamburger());
        hamburger.start();
        // NEW && TERMINATED => ThreadMXBean 에 담겨있는지 확인
        // NEW => after 30sec => RUNNABLE
        // 3
        Thread late_hamburger = new Thread(new Hamburger());
        TimeUnit.SECONDS.sleep(5);
        late_hamburger.start();

        // RUNNABLE && BLOCKED (synchronized method)
        Thread order = new Thread(new Order());
        Thread newOrder = new Thread(new Order());

        order.start();
        newOrder.start();

        // WAITING by orderEdit.join()
        Thread editableOrder = new Thread(new EditableOrder());
        editableOrder.start();

        // TIMED_WAITING
        Thread presentFood = new Thread(new PresentFood());
        presentFood.start();

        // Deadlock
        ThreadDemo1 T1 = new ThreadDemo1();
        ThreadDemo2 T2 = new ThreadDemo2();
        T1.start();
        T2.start();
    }

    private static class ThreadDemo1 extends Thread {
        public void run() {
            synchronized (Lock1) {
                System.out.println("Thread 1: Holding lock 1...");

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}
                System.out.println("Thread 1: Waiting for lock 2...");

                synchronized (Lock2) {
                    System.out.println("Thread 1: Holding lock 1 & 2...");
                }
            }
        }
    }
    private static class ThreadDemo2 extends Thread {
        public void run() {
            synchronized (Lock2) {
                System.out.println("Thread 2: Holding lock 2...");

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}
                System.out.println("Thread 2: Waiting for lock 1...");

                synchronized (Lock1) {
                    System.out.println("Thread 2: Holding lock 1 & 2...");
                }
            }
        }
    }
}

class Hamburger implements Runnable {

    @Override
    public void run() {

    }
}

class Order implements Runnable {

    @Override
    public void run() {
        makeFood();
    }

    public static synchronized void makeFood() {
        while (true) {
            // 주문을 받고 음식을 만들고 있다는 가정 하에
            // 만약 새로운 주문이 들어온다면 먼저 주문이 들어온 음식이 나올 때 까지
            // 새로운 음식은 나올 수가 없다
        }
    }
}

class OrderEdit implements Runnable {

    @Override
    public void run() {
        try {
            Thread.sleep(10000);

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }
}

class EditableOrder implements Runnable {

    @Override
    public void run() {
        Thread orderEdit = new Thread(new OrderEdit()); // 음식을 만드는 와중에 요청사항이 발생했다.
        orderEdit.start(); // 요청사항 대로 조리방법을 변경했다.

        try {
            orderEdit.join(); //
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }
}

class PresentFood implements Runnable {

    @Override
    public void run() {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }
}

