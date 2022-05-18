package ssafy;

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;
import java.sql.Array;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ThreadProducer
{
    public static Object Lock1 = new Object();
    public static Object Lock2 = new Object();

    public static void main( String[] args ) throws InterruptedException {

        List<Thread> runnableThreads = new ArrayList<Thread>();

        TimerTask task = new TimerTask() {
            public void run() {
                for (int i = 0; i < 30; i++) {
                    Thread runnableThread = new Thread(new RunnableThread(), "Thread-Runnable-" + i);
                    runnableThread.start();
                    runnableThreads.add(runnableThread);
//                    System.out.println("runnable created");
                }

                for (int i = 0; i < 20; i++) {
                    // RUNNABLE
                    Thread sleepThread = new Thread(new SleepThread(), "Thread-SLEEP-" + i);
                    sleepThread.start();
                }
            }
        };


        ScheduledExecutorService exec = Executors.newSingleThreadScheduledExecutor();
        exec.scheduleAtFixedRate(new Runnable(){
            @Override
            public void run(){
                for (Thread runnableThread : runnableThreads ) {
                    runnableThread.interrupt();
//                    System.out.println("interrupting: " + runnableThread.getName());
                }
            }
        }, 60000, 180000, TimeUnit.MILLISECONDS);

        Timer timer = new Timer("Timer");
        long delay = 10000;
        long period = 120000;
        timer.scheduleAtFixedRate(task, delay, period);

        // RUNNABLE && BLOCKED (synchronized method)
        for (int i = 0; i < 30; i++) {
            Thread syncThread = new Thread(new SynchronizedThread(), "Thread-Sync-" + i);
            syncThread.start();
        }

//        Thread order = new Thread(new SynchronizedThread(), "Thread-FirstOrder");
//        Thread newOrder = new Thread(new SynchronizedThread(), "Thread-SecondOrder");
//        Thread newNewOrder = new Thread(new SynchronizedThread(), "Thread-ThirdOrder");
//
//        order.start();
//        newOrder.start();
//        newNewOrder.start();

        // WAITING by orderEdit.join()
        Thread interruptedThread = new Thread(new InterruptedThread(), "Thread-Interrupted");
        interruptedThread.start();

        // TIMED_WAITING
        Thread timedWaitingOrder = new Thread(new timedWaitingThread(), "Thread-TimedWaiting");
        timedWaitingOrder.start();

        // Deadlock
        ThreadDeadLockOne T1 = new ThreadDeadLockOne();
        ThreadDeadLockTwo T2 = new ThreadDeadLockTwo();
        ThreadDeadLockOne T3 = new ThreadDeadLockOne();
        ThreadDeadLockTwo T4 = new ThreadDeadLockTwo();
        T1.start();
        T2.start();
        T3.start();
        T4.start();

    }

    private static class ThreadDeadLockOne extends Thread {
        public void run() {
            synchronized (Lock1) {

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}

                synchronized (Lock2) {
                }
            }
        }
    }
    private static class ThreadDeadLockTwo extends Thread {
        public void run() {
            synchronized (Lock2) {

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}

                synchronized (Lock1) {
                }
            }
        }
    }

    static class RunnableThread implements Runnable {

        @Override
        public void run() {
            while(!Thread.currentThread().isInterrupted()){

            }
//            System.out.println("runnable interrupted");
        };
    }

    static class SleepThread implements Runnable {

        @Override
        public void run() {
            sleep();
        }

        public static void sleep() {
            try {
                Thread.sleep(30000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    static class SynchronizedThread implements Runnable {

        @Override
        public void run() {
            makeFood();
        }

        public static synchronized void makeFood() {
            while (true) {

            }
        }
    }

    static class InterruptingThread implements Runnable {

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

    static class InterruptedThread implements Runnable {

        @Override
        public void run() {
            Thread interruptingThread = new Thread(new InterruptingThread(), "InterruptingThread");
            interruptingThread.start();

            try {
                interruptingThread.join(); //
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                e.printStackTrace();
            }
        }
    }

    static class timedWaitingThread implements Runnable {

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
}





