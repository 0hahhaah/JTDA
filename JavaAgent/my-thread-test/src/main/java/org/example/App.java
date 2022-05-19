package org.example;

import java.util.ArrayList;
import java.util.List;
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
        for (int i = 0; i < 5; i++) {
            // RUNNABLE
            Thread basicThread = new Thread(new BasicThread(), "Thread-Basic-" + i);
            basicThread.start();
        }

        // NEW => after 10sec => RUNNABLE
        Thread lateStartThread = new Thread(new BasicThread(), "Thread-Basic-" + 6);
        TimeUnit.SECONDS.sleep(3);
        lateStartThread.start();

        // RUNNABLE && BLOCKED (synchronized method)
        Thread order = new Thread(new Order(), "Thread-FirstOrder");
        Thread newOrder = new Thread(new Order(), "Thread-SecondOrder");
        Thread newNewOrder = new Thread(new Order(), "Thread-ThirdOrder");

        order.start();
        newOrder.start();
        newNewOrder.start();

        // WAITING by orderEdit.join()
        Thread editableOrder = new Thread(new EditableOrder(), "Thread-EditWaitingOrder");
        editableOrder.start();

        // TIMED_WAITING
        Thread timedWaitingOrder = new Thread(new timedWaitingThread(), "Thread-TimedWaiting");
        timedWaitingOrder.start();

        TimeUnit.SECONDS.sleep(1);
        // Deadlock
        ThreadDemo1 T1 = new ThreadDemo1();
        ThreadDemo2 T2 = new ThreadDemo2();
        T1.start();
        T2.start();
    }

    private static class ThreadDemo1 extends Thread {
        public void run() {
            synchronized (Lock1) {

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}

                synchronized (Lock2) {
                }
            }
        }
    }
    private static class ThreadDemo2 extends Thread {
        public void run() {
            synchronized (Lock2) {

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}

                synchronized (Lock1) {
                }
            }
        }
    }
}

class BasicThread implements Runnable {

    @Override
    public void run() {
        keepRunning();
    }

    public static void keepRunning() {
        while (true) {

        }
    }
}

class Order implements Runnable {

    @Override
    public void run() {
        makeFood();
    }

    public static synchronized void makeFood() {
        while (true) {

        }
    }
}

class OrderEdit implements Runnable {

    @Override
    public void run() {
        try {
            Thread.sleep(30000);

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }
}

class EditableOrder implements Runnable {

    @Override
    public void run() {
        Thread orderEdit = new Thread(new OrderEdit(), "OrderEditing"); // 음식을 만드는 와중에 요청사항이 발생했다.
        orderEdit.start(); // 요청사항 대로 조리방법을 변경했다.

        try {
            orderEdit.join(); //
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }
}

class timedWaitingThread implements Runnable {

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

